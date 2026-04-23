import { Request, Response } from "express";
import { DeletarContatoService } from "../../services/contato/DeletarContatoService";

class DeletarContatoController {
    async handle(req: Request, res: Response) {
        const { id } = req.params;

        const deletarContatoService = new DeletarContatoService();
        const resultado = await deletarContatoService.execute(id);

        return res.json(resultado);
    }
}

export { DeletarContatoController };
