import { Request, Response } from "express";
import { ListarInscricoesService } from "../../services/inscricao/ListarInscricoesService";

class ListarInscricoesController {
    async handle(req: Request, res: Response) {
        const service = new ListarInscricoesService();
        const inscricoes = await service.execute();
        return res.json(inscricoes);
    }
}

export { ListarInscricoesController };
