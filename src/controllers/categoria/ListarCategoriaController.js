"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListarCategoriaController = void 0;
const ListarCategoriaService_1 = require("../../services/categoria/ListarCategoriaService");
class ListarCategoriaController {
    async handle(request, response) {
        const listarCategoriasService = new ListarCategoriaService_1.ListarCategoriaService();
        const categorias = await listarCategoriasService.execute();
        return response.json(categorias);
    }
}
exports.ListarCategoriaController = ListarCategoriaController;
