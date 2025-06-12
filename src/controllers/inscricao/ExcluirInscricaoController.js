"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcluirInscricaoController = void 0;
const ExcluirInscricaoService_1 = require("../../services/inscricao/ExcluirInscricaoService");
class ExcluirInscricaoController {
    async handle(req, res) {
        const { id } = req.params;
        const service = new ExcluirInscricaoService_1.ExcluirInscricaoService();
        try {
            const inscricao = await service.execute(id);
            return res.json({ message: "Inscrição excluída com sucesso." });
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}
exports.ExcluirInscricaoController = ExcluirInscricaoController;
