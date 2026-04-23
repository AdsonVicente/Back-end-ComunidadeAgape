"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListarEventosController = void 0;
const ListarEventosService_1 = require("../../services/evento/ListarEventosService");
class ListarEventosController {
    async handle(req, res) {
        const listarEventosService = new ListarEventosService_1.ListarEventosService();
        const eventos = await listarEventosService.execute();
        return res.json(eventos);
    }
}
exports.ListarEventosController = ListarEventosController;
