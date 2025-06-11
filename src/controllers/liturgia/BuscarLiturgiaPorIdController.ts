import { Request, Response } from 'express';
import { BuscarLiturgiaPorIdService } from '../../services/liturgia/BuscarLiturgiaPorIdService';

class BuscarLiturgiaPorIdController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const service = new BuscarLiturgiaPorIdService();
    const liturgia = await service.execute(id);

    return res.json(liturgia);
  }
}

export default  BuscarLiturgiaPorIdController;
