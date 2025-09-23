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
        res.json({ vagas_cadastradas });
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
        const { country, city, neighborhood, street, zip_code, number, unit, unit_number } = address || {};
        if (!name || !address) {
            return res.status(400).json({ message: "Nome e Endereço são obrigatórios!" });
        }
        const id_key = `${zip_code}${number}${unit}${unit_number}`;
        // valida com a nuvem se a vaga está disponível
        const response = yield axios_1.default.post("https://nuvem.com/api/reserve/new-reserve", { id_key });
        const { is_available } = response.data;
        if (!is_available) {
            return res.status(400).json({ message: "Vaga já está reservada!" });
        }
        // insere no banco local
        yield database_1.default.query(`INSERT INTO vagas 
        (id_key, name, country, city, neighborhood, street, zip_code, number, unit, unit_number, image, is_reserved) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [id_key, name, country, city, neighborhood, street, zip_code, number, unit, unit_number, image, false]);
        return res.status(201).json({ message: "Vaga criada com sucesso!", id_key });
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
 *                 type: string
 *     responses:
 *       200:
 *         description: Status atualizado com sucesso
 */
router.post("/vagas/update-status", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status, id_key } = req.body;
        if (!status || !id_key) {
            return res.status(400).json({ message: "Status e id_key são obrigatórios!" });
        }
        const is_reserved = status === "available" ? false : true;
        yield database_1.default.query("UPDATE vagas SET is_reserved = ? WHERE id_key = ?", [is_reserved, id_key]);
        res.json({ message: "Status atualizado com sucesso!" });
    }
    catch (error) {
        console.error("Erro ao atualizar status: ", error);
        res.status(500).json({ error: "Erro ao atualizar status" });
    }
}));
exports.default = router;
//# sourceMappingURL=vagas.js.map