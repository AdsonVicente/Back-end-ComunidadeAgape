import { Request, Response } from "express";
import { ListarConteudosService } from "../../services/conteudo/ListarConteudosService";

class ListarConteudosController {
    async handle(request: Request, response: Response) {
        try {
            const listarConteudosService = new ListarConteudosService();
            const conteudos = await listarConteudosService.execute();

            return response.status(200).json(conteudos);
        } catch (error) {
            console.error("Erro ao listar conteúdos:", error);
            return response.status(500).json({ error: "Erro ao listar conteúdos" });
        }
    }
}

export { ListarConteudosController };
