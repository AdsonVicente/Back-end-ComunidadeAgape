"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditarEventoController = void 0;
const EditarEventoService_1 = require("../../services/evento/EditarEventoService");
class EditarEventoController {
    async handle(req, res) {
        const { id } = req.params;
        const { titulo, descricao, local, data, horario } = req.body;
        const banner = req.file ? req.file.filename : undefined;
        const editarEventoService = new EditarEventoService_1.EditarEventoService();
        const evento = await editarEventoService.execute({
            id,
            titulo,
            descricao,
            local,
            data,
            horario,
            banner
        });
        return res.json(evento);
    }
}
exports.EditarEventoController = EditarEventoController;
