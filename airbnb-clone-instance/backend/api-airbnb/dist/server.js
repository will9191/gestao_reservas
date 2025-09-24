"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const express_1 = __importDefault(require("express"));
const vagas_1 = __importDefault(require("./routes/vagas_local/vagas"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const reserve_1 = __importDefault(require("./routes/vagas_nuvem/reserve"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
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
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
// rotas da nuvem
app.use("/nuvem", reserve_1.default);
// rotas locais (banco local)
app.use("/", vagas_1.default);
app.get("/", (req, res) => {
    res.send("API Rodando");
});
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
    console.log("Documentação em http://localhost:3000/api-docs");
});
exports.default = app;
//# sourceMappingURL=server.js.map