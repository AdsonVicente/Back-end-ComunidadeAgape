import { Request, Response } from 'express';
import EditarLiturgiaService from '../../services/liturgia/EditarLiturgiaService';
import { BadRequestError } from '../../utils/api-errors';

// Extende o tipo Request para incluir 'administrador'
declare module 'express-serve-static-core' {
    interface Request {
        administrador?: { id: string };
    }
}

class EditarLiturgiaController {
    async handle(req: Request, res: Response) {
        try {
            const { id } = req.params;

            // Pega o ID do usuário autenticado (supondo middleware que insere isso)
            const usuarioId = req.administrador?.id;

            if (!usuarioId) {
                throw new BadRequestError('Usuário não autenticado.');
            }

            const {
                titulo,
                corLiturgica,
                primeiraLeitura,
                salmoResponsorial,
                segundaLeitura,
                evangelho,
                dia
            } = req.body;

            const liturgiaAtualizada = await EditarLiturgiaService.editarLiturgia(id, {
                titulo,
                corLiturgica,
                primeiraLeitura,
                salmoResponsorial,
                segundaLeitura,
                evangelho,
                dia,
                usuarioId
            });

            return res.status(200).json(liturgiaAtualizada);
        } catch (error) {
            // repassa o erro para o middleware de erros central
            return res.status(error.statusCode || 500).json({ mensagem: error.message });
        }
    }
}

export default  EditarLiturgiaController;
