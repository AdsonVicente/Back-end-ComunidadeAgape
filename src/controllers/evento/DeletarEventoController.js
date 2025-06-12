"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletarEventoController = void 0;
const DeletarEventoService_1 = require("../../services/evento/DeletarEventoService");
class DeletarEventoController {
    async handle(req, res) {
        const { id } = req.params;
        const deletarEventoService = new DeletarEventoService_1.DeletarEventoService();
        const resultado = await deletarEventoService.execute(id);
        return res.json(resultado);
    }
}
exports.DeletarEventoController = DeletarEventoController;
