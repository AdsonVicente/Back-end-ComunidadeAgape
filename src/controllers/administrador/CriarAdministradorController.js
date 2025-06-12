"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CriarAdministradorController = void 0;
const CriarAdministradorService_1 = require("../../services/administrador/CriarAdministradorService");
class CriarAdministradorController {
    async handle(req, res) {
        const { nome, email, senha } = req.body;
        const criarAdministradorService = new CriarAdministradorService_1.CriarAdministradorService();
        const administrador = await criarAdministradorService.execute({
            nome,
            email,
            senha
        });
        return res.json({ administrador });
    }
}
exports.CriarAdministradorController = CriarAdministradorController;
