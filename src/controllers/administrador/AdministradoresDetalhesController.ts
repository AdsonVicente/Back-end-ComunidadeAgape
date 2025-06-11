import { Request, Response } from 'express';

import { AdministradoresDetalhesService } from '../../services/administrador/AdministradoresDetalhesService';

class AdministradoresDetalhesController {

    async handle(req: Request, res: Response) {
        const service = new AdministradoresDetalhesService();
        const admins = await service.execute();
        return res.json(admins);
    }
}
export default AdministradoresDetalhesController;
