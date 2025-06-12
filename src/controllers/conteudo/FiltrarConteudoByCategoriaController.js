"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FiltrarConteudoByCategoriaController = void 0;
const FiltrarConteudosByCategoriaService_1 = require("../../services/conteudo/FiltrarConteudosByCategoriaService");
class FiltrarConteudoByCategoriaController {
    async handle(req, res) {
        const categoria = req.query.categoria;
        const filtrarConteudoByCategoriaService = new FiltrarConteudosByCategoriaService_1.FiltrarConteudosByCategoriaService();
        const conteudos = await filtrarConteudoByCategoriaService.execute({
            categoria
        });
        return conteudos;
    }
}
exports.FiltrarConteudoByCategoriaController = FiltrarConteudoByCategoriaController;
