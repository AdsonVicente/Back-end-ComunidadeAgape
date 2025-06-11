import { Request, Response } from "express";
import { ListarEventosService } from "../../services/evento/ListarEventosService";

class ListarEventosController {
  async handle(req: Request, res: Response) {
    const listarEventosService = new ListarEventosService();
    const eventos = await listarEventosService.execute();
    return res.json(eventos);
  }
}

export { ListarEventosController };
