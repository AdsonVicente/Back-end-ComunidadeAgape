import { Request, Response } from "express";
import { FiltrarConteudosPorAutorService } from "../../services/conteudo/FiltrarConteudosPorAutorService";

class FiltrarConteudosPorAutorController {
  async handle(req: Request, res: Response) {
    const { autor } = req.body;

    const filtrarService = new FiltrarConteudosPorAutorService();
    const conteudos = await filtrarService.execute({ autor });

    return res.json(conteudos);
  }
}

export { FiltrarConteudosPorAutorController };
