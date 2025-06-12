"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListarInscricoesPorEventoController = void 0;
const ListarInscricoesPorEventoService_1 = require("../../services/inscricao/ListarInscricoesPorEventoService");
class ListarInscricoesPorEventoController {
    async handle(req, res) {
        const { eventoId } = req.params;
        const service = new ListarInscricoesPorEventoService_1.ListarInscricoesPorEventoService();
        const inscricoes = await service.execute(eventoId);
        return res.json(inscricoes);
    }
}
exports.ListarInscricoesPorEventoController = ListarInscricoesPorEventoController;
