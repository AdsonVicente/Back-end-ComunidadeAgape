"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListarConteudosController = void 0;
const ListarConteudosService_1 = require("../../services/conteudo/ListarConteudosService");
class ListarConteudosController {
    async handle(request, response) {
        try {
            const listarConteudosService = new ListarConteudosService_1.ListarConteudosService();
            const conteudos = await listarConteudosService.execute();
            return response.status(200).json(conteudos);
        }
        catch (error) {
            console.error("Erro ao listar conteúdos:", error);
            return response.status(500).json({ error: "Erro ao listar conteúdos" });
        }
    }
}
exports.ListarConteudosController = ListarConteudosController;
