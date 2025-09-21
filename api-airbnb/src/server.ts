import swaggerUi from "swagger-ui-express";
import express, { Request, Response } from "express";
import vagasRouter from "./routes/vagas_local/vagas";
import swaggerJSDoc from "swagger-jsdoc";
import nuvemRouter from "./routes/vagas_nuvem/reserve"; 

const app = express();

app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Airbnb - API",
      version: "1.0.0",
      description: "API desenvolvida para ilustrar a plataforma Airbnb",
    },
  },
  apis: ["dist/routes/**/*.js"], // pega todos os arquivos de rotas
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// rotas da nuvem
app.use("/nuvem", nuvemRouter);

// rotas locais (banco local)
app.use("/", vagasRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("API Rodando");
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
  console.log("Documentação em http://localhost:3000/api-docs");
});

export default app;