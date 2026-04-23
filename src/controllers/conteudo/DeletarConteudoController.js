"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletarConteudoController = void 0;
const DeletarConteudoService_1 = require("../../services/conteudo/DeletarConteudoService");
class DeletarConteudoController {
    async handle(req, res) {
        const { id } = req.params;
        const deletarConteudoService = new DeletarConteudoService_1.DeletarConteudoService();
        const resultado = await deletarConteudoService.execute(id);
        return res.json(resultado);
    }
}
exports.DeletarConteudoController = DeletarConteudoController;
