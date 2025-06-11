import { Request, Response } from "express";
import { DeletarEventoService } from "../../services/evento/DeletarEventoService";

class DeletarEventoController {
    async handle(req: Request, res: Response) {
        const { id } = req.params;

        const deletarEventoService = new DeletarEventoService();
        const resultado = await deletarEventoService.execute(id);

        return res.json(resultado);
    }
}

export { DeletarEventoController };
