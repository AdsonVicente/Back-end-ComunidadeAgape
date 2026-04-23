import { Request, Response } from "express";
import { ListarInscricoesPorEventoService } from "../../services/inscricao/ListarInscricoesPorEventoService";

class ListarInscricoesPorEventoController {
    async handle(req: Request, res: Response) {
        const { eventoId } = req.params;
        const service = new ListarInscricoesPorEventoService();
        const inscricoes = await service.execute(eventoId);
        return res.json(inscricoes);
    }
}

export { ListarInscricoesPorEventoController };
