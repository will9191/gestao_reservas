import express, { Router, Request, Response } from "express";
import axios from "axios";

const router = Router();

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
router.post("/api/reserve/status", async (req: Request, res: Response) => {
  try {
    const { id_key } = req.body;
    if (!id_key) {
      return res.status(400).json({ error: "id_key é obrigatório" });
    }

    // chamada para nuvem
    const response = await axios.post(`${process.env.URL_NUVEM}/api/reserve/status`, { id_key });

    // supondo que a nuvem responde { status: "available" } ou { status: "non-existent" }
    const { is_reserved } = response.data;

    return res.json({ is_reserved });
  } catch (error) {
    console.error("Erro ao consultar API da nuvem:", error);
    return res.status(500).json({ error: "Erro ao consultar status na nuvem" });
  }
});

export default router;
