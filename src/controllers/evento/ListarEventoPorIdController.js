"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListarEventoPorIdController = void 0;
const ListarEventoPorIdService_1 = require("../../services/evento/ListarEventoPorIdService");
class ListarEventoPorIdController {
    async handle(req, res) {
        const { id } = req.params;
        const service = new ListarEventoPorIdService_1.ListarEventoPorIdService();
        try {
            const evento = await service.execute(id);
            if (!evento) {
                return res.status(404).json({ message: "Evento não encontrado." });
            }
            return res.json(evento);
        }
        catch (error) {
            console.error("Erro ao buscar evento:", error);
            return res.status(500).json({ message: "Erro interno do servidor." });
        }
    }
}
exports.ListarEventoPorIdController = ListarEventoPorIdController;
