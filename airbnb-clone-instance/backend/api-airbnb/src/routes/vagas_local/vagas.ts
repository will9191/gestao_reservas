import express, { Router, Request, Response } from "express";
import pool from "../../config/database";
import axios from "axios";

const router = Router();

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
router.get("/vagas/vagas-cadastradas-local", async (req: Request, res: Response) => {
  try {
    const [vagas_cadastradas]: any = await pool.query("SELECT * FROM vagas");
    res.json({ vagas_cadastradas });
  } catch (error) {
    console.error("Erro ao consultar tabela de vagas: ", error);
    res.status(500).json({ error: "Erro ao consultar tabela de vagas!" });
  }
});

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
router.post("/vagas/cadastro-local", async (req: Request, res: Response) => {
  try {
    const { name, address, image } = req.body;
    const { country, city, neighborhood, street, zip_code, number, unit, unit_number } = address || {};

    if (!name || !address) {
      return res.status(400).json({ message: "Nome e Endereço são obrigatórios!" });
    }

    const id_key = `${zip_code}${number}${unit}${unit_number}`;

    // valida com a nuvem se a vaga está disponível
    const response = await axios.post("https://nuvem.com/api/reserve/new-reserve", { id_key });
    const { is_available } = response.data;

    if (!is_available) {
      return res.status(400).json({ message: "Vaga já está reservada!" });
    }

    // insere no banco local
    await pool.query(
      `INSERT INTO vagas 
        (id_key, name, country, city, neighborhood, street, zip_code, number, unit, unit_number, image, is_reserved) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id_key, name, country, city, neighborhood, street, zip_code, number, unit, unit_number, image, false]
    );

    return res.status(201).json({ message: "Vaga criada com sucesso!", id_key });
  } catch (error) {
    console.error("Erro ao cadastrar vaga: ", error);
    return res.status(500).json({ message: "Erro ao cadastrar vaga" });
  }
});

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
router.post("/vagas/update-status", async (req: Request, res: Response) => {
  try {
    const { status, id_key } = req.body;
    if (!status || !id_key) {
      return res.status(400).json({ message: "Status e id_key são obrigatórios!" });
    }

    const is_reserved = status === "available" ? false : true;

    await pool.query("UPDATE vagas SET is_reserved = ? WHERE id_key = ?", [is_reserved, id_key]);

    res.json({ message: "Status atualizado com sucesso!" });
  } catch (error) {
    console.error("Erro ao atualizar status: ", error);
    res.status(500).json({ error: "Erro ao atualizar status" });
  }
});

export default router;
