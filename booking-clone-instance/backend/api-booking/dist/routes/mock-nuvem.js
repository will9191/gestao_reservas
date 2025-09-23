"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// simula reserva na nuvem
router.post("/api/reserve/new-reserve", (req, res) => {
    const { id_key } = req.body;
    // exemplo: vaga "12345" já está reservada
    if (id_key === "12345") {
        return res.json({ is_available: false });
    }
    return res.json({ is_available: true });
});
// simula status na nuvem
router.post("/api/reserve/status", (req, res) => {
    const { id_key } = req.body;
    if (id_key === "12345") {
        return res.json({ status: "non-existent" });
    }
    return res.json({ status: "available" });
});
exports.default = router;
//# sourceMappingURL=mock-nuvem.js.map