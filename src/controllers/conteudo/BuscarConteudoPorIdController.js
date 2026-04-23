"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuscarConteudoPorIdController = void 0;
const BuscarConteudoPorIdService_1 = require("../../services/conteudo/BuscarConteudoPorIdService");
class BuscarConteudoPorIdController {
    async handle(req, res) {
        const { id } = req.params;
        const buscarConteudoPorIdService = new BuscarConteudoPorIdService_1.BuscarConteudoPorIdService();
        try {
            const conteudo = await buscarConteudoPorIdService.execute(id);
            return res.json(conteudo);
        }
        catch (error) {
            return res.status(404).json({ error: error.message });
        }
    }
}
exports.BuscarConteudoPorIdController = BuscarConteudoPorIdController;
