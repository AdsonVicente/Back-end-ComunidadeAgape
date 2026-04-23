"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListarLiturgiasController = void 0;
const ListarLiturgiasService_1 = require("../../services/liturgia/ListarLiturgiasService");
class ListarLiturgiasController {
    async handle(req, res) {
        const service = new ListarLiturgiasService_1.ListarLiturgiasService();
        try {
            const liturgias = await service.execute();
            return res.status(200).json(liturgias);
        }
        catch (error) {
            console.error("Erro ao listar liturgias:", error);
            return res.status(500).json({ error: "Erro ao listar liturgias." });
        }
    }
}
exports.ListarLiturgiasController = ListarLiturgiasController;
