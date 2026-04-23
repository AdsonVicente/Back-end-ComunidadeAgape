"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditarConteudoController = void 0;
const EditarConteudoService_1 = require("../../services/conteudo/EditarConteudoService");
class EditarConteudoController {
    async handle(req, res) {
        try {
            const { id } = req.params;
            const { titulo, descricao, categoria, autor } = req.body;
            const banner = req.file ? req.file.filename : undefined;
            const editarConteudoService = new EditarConteudoService_1.EditarConteudoService();
            const conteudo = await editarConteudoService.execute({
                id,
                titulo,
                descricao,
                categoria,
                autor,
                banner
            });
            return res.json(conteudo);
        }
        catch (error) {
            console.error(error);
            return res.status(400).json({ error: "Erro ao atualizar conteúdo", details: error.message });
        }
    }
}
exports.EditarConteudoController = EditarConteudoController;
