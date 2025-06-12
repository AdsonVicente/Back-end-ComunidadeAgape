"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EditarAdministradorService_1 = require("../../services/administrador/EditarAdministradorService");
class EditarAdministradorController {
    async handle(req, res) {
        const { nome, email, senha } = req.body;
        const { id } = req.params;
        try {
            const editarAdministradorService = new EditarAdministradorService_1.EditarAdministradorService();
            const resultado = await editarAdministradorService.execute({
                id,
                nome,
                email,
                senha,
            });
            return res.json({ administrador: resultado });
        }
        catch (error) {
            console.error(error);
            return res.status(400).json({ message: error.message || "Erro ao editar administrador." });
        }
    }
}
exports.default = EditarAdministradorController;
