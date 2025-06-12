import { Response, Request } from "express";
import { FiltrarConteudosByCategoriaService } from "../../services/conteudo/FiltrarConteudosByCategoriaService";

class FiltrarConteudoByCategoriaController {
  async handle(req: Request, res: Response) {
    try {
      const categoria = req.query.categoria as string;

      if (!categoria) {
        return res.status(400).json({ error: "Parâmetro 'categoria' é obrigatório." });
      }

      const filtrarConteudoByCategoriaService = new FiltrarConteudosByCategoriaService();

      const conteudos = await filtrarConteudoByCategoriaService.execute({ categoria });

      return res.json(conteudos);
    } catch (error) {
      console.error("Erro ao filtrar conteúdos:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
}

export { FiltrarConteudoByCategoriaController };
