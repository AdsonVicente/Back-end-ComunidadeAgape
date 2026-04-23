import { Request, Response } from "express";
import { ListarLiturgiasService } from "../../services/liturgia/ListarLiturgiasService";

class ListarLiturgiasController {
    async handle(req: Request, res: Response) {
        const service = new ListarLiturgiasService();

        try {
            const liturgias = await service.execute();
            return res.status(200).json(liturgias);
        } catch (error) {
            console.error("Erro ao listar liturgias:", error);
            return res.status(500).json({ error: "Erro ao listar liturgias." });
        }
    }
}

export { ListarLiturgiasController };
