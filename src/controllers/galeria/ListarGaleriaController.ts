// src/controllers/galeria/ListarGaleriaController.ts
import { Request, Response } from 'express';
import { ListarGaleriaService } from '../../services/galeria/ListarGaleriaService';

export class ListarGaleriaController {
  async handle(req: Request, res: Response) {
    try {
      const listarGaleriaService = new ListarGaleriaService();
      const imagens = await listarGaleriaService.execute();

      return res.json(imagens);
    } catch (error) {
      console.error('Erro ao listar imagens da galeria:', error);
      return res.status(500).json({
        error: 'Erro interno ao listar imagens da galeria.',
      });
    }
  }
}
