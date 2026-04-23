import { Request, Response } from "express";
import { ListarLiturgiaDoDiaService } from "../../services/liturgia/ListarLiturgiaDoDiaService";

class ListarLiturgiaDoDiaController {
    async handle(req: Request, res: Response) {
        const { date } = req.query;

        const service = new ListarLiturgiaDoDiaService();

        try {
            const liturgia = await service.execute(date as string | undefined);

            if (!liturgia) {
                return res.status(404).json({ mensagem: "Liturgia não encontrada para este dia." });
            }

            return res.status(200).json(liturgia);
        } catch (error) {
            console.error("Erro ao buscar liturgia:", error);
            return res.status(500).json({ erro: "Erro interno ao buscar liturgia." });
        }
    }
}

export { ListarLiturgiaDoDiaController };
