"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BuscarLiturgiaPorIdService_1 = require("../../services/liturgia/BuscarLiturgiaPorIdService");
class BuscarLiturgiaPorIdController {
    async handle(req, res) {
        const { id } = req.params;
        const service = new BuscarLiturgiaPorIdService_1.BuscarLiturgiaPorIdService();
        const liturgia = await service.execute(id);
        return res.json(liturgia);
    }
}
exports.default = BuscarLiturgiaPorIdController;
