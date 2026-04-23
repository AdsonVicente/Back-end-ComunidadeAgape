"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListarLiturgiaDoDiaController = void 0;
const ListarLiturgiaDoDiaService_1 = require("../../services/liturgia/ListarLiturgiaDoDiaService");
class ListarLiturgiaDoDiaController {
    async handle(req, res) {
        const service = new ListarLiturgiaDoDiaService_1.ListarLiturgiaDoDiaService();
        try {
            const liturgia = await service.execute();
            if (!liturgia) {
                return res.status(404).json({ mensagem: "Liturgia do dia não encontrada." });
            }
            return res.status(200).json(liturgia);
        }
        catch (error) {
            console.error("Erro ao buscar liturgia do dia:", error);
            return res.status(500).json({ erro: "Erro interno ao buscar a liturgia." });
        }
    }
}
exports.ListarLiturgiaDoDiaController = ListarLiturgiaDoDiaController;
