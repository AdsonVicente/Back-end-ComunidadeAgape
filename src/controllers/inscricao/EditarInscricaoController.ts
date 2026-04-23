import { Request, Response } from "express";
import { EditarInscricaoService } from "../../services/inscricao/EditarInscricaoService";

class EditarInscricaoController {
    async handle(req: Request, res: Response) {
        const { id } = req.params;
        const service = new EditarInscricaoService();

        try {
            const inscricao = await service.execute({ id, ...req.body });
            return res.json(inscricao);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { EditarInscricaoController };
