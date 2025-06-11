import { Request, Response } from "express";
import { DeletarConteudoService } from "../../services/conteudo/DeletarConteudoService";

class DeletarConteudoController {
    async handle(req: Request, res: Response) {
        const { id } = req.params;

        const deletarConteudoService = new DeletarConteudoService();
        const resultado = await deletarConteudoService.execute(id);

        return res.json(resultado);
    }
}

export { DeletarConteudoController };
