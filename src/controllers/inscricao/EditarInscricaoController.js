"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditarInscricaoController = void 0;
const EditarInscricaoService_1 = require("../../services/inscricao/EditarInscricaoService");
class EditarInscricaoController {
    async handle(req, res) {
        const { id } = req.params;
        const service = new EditarInscricaoService_1.EditarInscricaoService();
        try {
            const inscricao = await service.execute({ id, ...req.body });
            return res.json(inscricao);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}
exports.EditarInscricaoController = EditarInscricaoController;
