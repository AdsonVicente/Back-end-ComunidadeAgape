import { Request, Response } from "express";
import { ListarEventoPorIdService } from "../../services/evento/ListarEventoPorIdService";


class ListarEventoPorIdController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const service = new ListarEventoPorIdService();

    try {
      const evento = await service.execute(id);

      if (!evento) {
        return res.status(404).json({ message: "Evento não encontrado." });
      }

      return res.json(evento);
    } catch (error) {
      console.error("Erro ao buscar evento:", error);
      return res.status(500).json({ message: "Erro interno do servidor." });
    }
  }
}

export { ListarEventoPorIdController };
