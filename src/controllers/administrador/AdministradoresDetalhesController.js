"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdministradoresDetalhesService_1 = require("../../services/administrador/AdministradoresDetalhesService");
class AdministradoresDetalhesController {
    async handle(req, res) {
        const service = new AdministradoresDetalhesService_1.AdministradoresDetalhesService();
        const admins = await service.execute();
        return res.json(admins);
    }
}
exports.default = AdministradoresDetalhesController;
