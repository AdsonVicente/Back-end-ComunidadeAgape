import { Request, Response } from "express";
import { ListarLiturgiaDoDiaService } from "../../services/liturgia/ListarLiturgiaDoDiaService";

class ListarLiturgiaDoDiaController {
    async handle(req: Request, res: Response) {
        const service = new ListarLiturgiaDoDiaService();

        try {
            const liturgia = await service.execute();

            if (!liturgia) {
                return res.status(404).json({ mensagem: "Liturgia do dia não encontrada." });
            }

            return res.status(200).json(liturgia);
        } catch (error) {
            console.error("Erro ao buscar liturgia do dia:", error);
            return res.status(500).json({ erro: "Erro interno ao buscar a liturgia." });
        }
    }
}

export { ListarLiturgiaDoDiaController };
