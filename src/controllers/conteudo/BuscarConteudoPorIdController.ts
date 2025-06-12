import { Request, Response } from "express";
import { BuscarConteudoPorIdService } from "../../services/conteudo/BuscarConteudoPorIdService";

class BuscarConteudoPorIdController {
    async handle(req: Request, res: Response) {
        const { id } = req.params;

        const buscarConteudoPorIdService = new BuscarConteudoPorIdService();

        try {
            const conteudo = await buscarConteudoPorIdService.execute(id);
            return res.json(conteudo);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            return res.status(404).json({ error: errorMessage });
        }
    }
}

export { BuscarConteudoPorIdController };
