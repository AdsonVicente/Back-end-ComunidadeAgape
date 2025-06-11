import { Request, Response } from "express";
import { EditarConteudoService } from "../../services/conteudo/EditarConteudoService";

class EditarConteudoController {
    async handle(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { titulo, descricao, categoria, autor } = req.body;
            const banner = req.file ? req.file.filename : undefined;

            const editarConteudoService = new EditarConteudoService();

            const conteudo = await editarConteudoService.execute({
                id,
                titulo,
                descricao,
                categoria,
                autor,
                banner
            });

            return res.json(conteudo);
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: "Erro ao atualizar conteúdo", details: error.message });
        }
    }
}

export { EditarConteudoController };
