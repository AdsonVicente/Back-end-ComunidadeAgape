"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcluirLiturgiaController = void 0;
const ExcluirLiturgiaService_1 = require("../../services/liturgia/ExcluirLiturgiaService");
class ExcluirLiturgiaController {
    async handle(req, res) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'ID da liturgia é obrigatório' });
        }
        try {
            await (0, ExcluirLiturgiaService_1.excluirLiturgiaService)(id);
            return res.status(200).json({ message: 'Liturgia excluída com sucesso' });
        }
        catch (error) {
            if (error.message === 'Liturgia não encontrada') {
                return res.status(404).json({ message: error.message });
            }
            return res.status(500).json({ message: 'Erro ao excluir liturgia' });
        }
    }
}
exports.ExcluirLiturgiaController = ExcluirLiturgiaController;
