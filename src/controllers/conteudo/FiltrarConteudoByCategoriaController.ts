import { Response, Request } from "express";
import { FiltrarConteudosByCategoriaService } from "../../services/conteudo/FiltrarConteudosByCategoriaService";

class FiltrarConteudoByCategoriaController {
    async handle(req: Request, res: Response) {

        const categoria = req.query.categoria as string;

        const filtrarConteudoByCategoriaService = new FiltrarConteudosByCategoriaService();

        const conteudos = await filtrarConteudoByCategoriaService.execute({
            categoria
        });

        return conteudos
    }
}

export { FiltrarConteudoByCategoriaController };