"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = __importDefault(require("../../config/database"));
const axios_1 = __importDefault(require("axios"));
const router = (0, express_1.Router)();
/**
 * @swagger
 * /vagas/vagas-cadastradas-local:
 *   get:
 *     summary: Exibir lista de vagas
 *     tags:
 *       - Vagas-Local
 *     responses:
 *       200:
 *         description: Exibe as vagas cadastradas
 */
router.get("/vagas/vagas-cadastradas-local", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [vagas_cadastradas] = yield database_1.default.query("SELECT * FROM vagas");
        const vagasComStatusAtualizado = yield Promise.all(vagas_cadastradas.map((vaga) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(`${process.env.URL_NUVEM}/api/reserve/status/${vaga.id_key}`);
                return Object.assign(Object.assign({}, vaga), { is_reserved: !response.data.isAvailable });
            }
            catch (error) {
                // Se houver um erro, a vaga é retornada com o status original
                // Você pode definir um valor padrão se preferir
                console.error("Erro ao consultar o status da vaga ${vaga.id_key}:", error.message);
                return Object.assign(Object.assign({}, vaga), { is_reserved: false });
            }
        })));
        res.json({ vagas_cadastradas: vagasComStatusAtualizado });
    }
    catch (error) {
        console.error("Erro ao consultar tabela de vagas: ", error);
        res.status(500).json({ error: "Erro ao consultar tabela de vagas!" });
    }
}));
/**
 * @swagger
 * /vagas/cadastro-local:
 *   post:
 *     summary: Cria uma nova vaga
 *     tags:
 *       - Vagas-Local
 *     description: Cadastra uma nova vaga no banco de dados local (após validar com a nuvem)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: object
 *                 properties:
 *                   country:
 *                     type: string
 *                   city:
 *                     type: string
 *                   neighborhood:
 *                     type: string
 *                   street:
 *                     type: string
 *                   zip_code:
 *                     type: string
 *                   number:
 *                     type: string
 *                   unit:
 *                     type: string
 *                   unit_number:
 *                     type: string
 *               image:
 *                 type: string
 *     responses:
 *       201:
 *         description: Vaga criada com sucesso!
 *       400:
 *         description: Dados inválidos
 */
router.post("/vagas/cadastro-local", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, address, image } = req.body;
        const { country, city, neighborhood, street, zip_code, number, unit, unit_number, } = address || {};
        if (!name || !address) {
            return res
                .status(400)
                .json({ message: "Nome e Endereço são obrigatórios!" });
        }
        const id_key = `${zip_code}${number}${unit}${unit_number}`;
        const uniqueIdentifier = id_key;
        // valida com a nuvem se a vaga está disponível
        const response = yield axios_1.default.post(`${process.env.URL_NUVEM}/api/reserve/new-reserve`, { uniqueIdentifier });
        console.log("Response from cloud:", response);
        const { isAvailable } = response.data;
        if (!isAvailable) {
            return res.status(400).json({ message: "Vaga já está reservada!" });
        }
        // insere no banco local
        yield database_1.default.query(`INSERT INTO vagas 
        (id_key, name, country, city, neighborhood, street, zip_code, number, unit, unit_number, image, is_reserved) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
            id_key,
            name,
            country,
            city,
            neighborhood,
            street,
            zip_code,
            number,
            unit,
            unit_number,
            image,
            false,
        ]);
        return res
            .status(201)
            .json({ message: "Vaga criada com sucesso!", id_key });
    }
    catch (error) {
        console.error("Erro ao cadastrar vaga: ", error);
        return res.status(500).json({ message: "Erro ao cadastrar vaga" });
    }
}));
/**
 * @swagger
 * /vagas/update-status:
 *   post:
 *     summary: Atualiza o status de uma vaga no banco local
 *     tags:
 *       - Vagas-Local
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_key:
 *                 type: string
 *               status:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Status atualizado com sucesso
 */
router.post("/vagas/update-status", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_key } = req.body;
        if (!id_key) {
            return res.status(400).json({ message: "id_key é obrigatório!" });
        }
        const uniqueIdentifier = id_key;
        // sincroniza com a nuvem
        const response = yield axios_1.default.patch(`${process.env.URL_NUVEM}/api/reserve/book-reserve/${uniqueIdentifier}`);
        if (response.status !== 200) {
            return res
                .status(400)
                .json({ message: "Não foi possível atualizar o status na nuvem!" });
        }
        const { reserveBooked } = response.data;
        yield database_1.default.query("UPDATE vagas SET is_reserved = true WHERE id_key = ?", [
            id_key,
        ]);
        return res.json({
            message: "Status atualizado com sucesso!",
            reserveBooked,
        });
    }
    catch (error) {
        console.error("Erro ao atualizar status: ", error);
        res.status(500).json({ error: "Erro ao atualizar status" });
    }
}));
exports.default = router;
//# sourceMappingURL=vagas.js.map