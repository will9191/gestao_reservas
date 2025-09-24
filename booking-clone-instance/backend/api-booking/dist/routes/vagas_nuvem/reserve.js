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
const axios_1 = __importDefault(require("axios"));
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/reserve/status:
 *   post:
 *     summary: Consulta o status de uma vaga na nuvem
 *     tags:
 *       - Vagas-Nuvem
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_key:
 *                 type: string
 *     responses:
 *       200:
 *         description: Retorna o status da vaga (available || non-existent)
 */
router.post("/api/reserve/status", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_key } = req.body;
        if (!id_key) {
            return res.status(400).json({ error: "id_key é obrigatório" });
        }
        const uniqueIdentifier = id_key;
        // chamada para nuvem
        const response = yield axios_1.default.post(`${process.env.URL_NUVEM}/api/reserve/status`, { uniqueIdentifier });
        const { isReserved } = response.data;
        return res.json({ isReserved });
    }
    catch (error) {
        console.error("Erro ao consultar API da nuvem:", error);
        return res.status(500).json({ error: "Erro ao consultar status na nuvem" });
    }
}));
exports.default = router;
//# sourceMappingURL=reserve.js.map