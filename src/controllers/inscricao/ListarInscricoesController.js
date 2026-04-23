"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListarInscricoesController = void 0;
const ListarInscricoesService_1 = require("../../services/inscricao/ListarInscricoesService");
class ListarInscricoesController {
    async handle(req, res) {
        const service = new ListarInscricoesService_1.ListarInscricoesService();
        const inscricoes = await service.execute();
        return res.json(inscricoes);
    }
}
exports.ListarInscricoesController = ListarInscricoesController;
