import { Request, Response } from 'express';
import { excluirLiturgiaService } from '../../services/liturgia/ExcluirLiturgiaService';


export class ExcluirLiturgiaController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'ID da liturgia é obrigatório' });
    }

    try {
      await excluirLiturgiaService(id);
      return res.status(200).json({ message: 'Liturgia excluída com sucesso' });
    } catch (error: any) {
      if (error.message === 'Liturgia não encontrada') {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Erro ao excluir liturgia' });
    }
  }
}
