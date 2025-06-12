import { Request, Response } from 'express';
import EditarLiturgiaService from '../../services/liturgia/EditarLiturgiaService';
import { BadRequestError } from '../../utils/api-errors';

// Extende o tipo Request para incluir 'user_id' (de acordo com middleware)
declare module 'express-serve-static-core' {
    interface Request {
        user_id?: string;
    }
}

class EditarLiturgiaController {
    async handle(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const usuarioId = req.user_id;

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

            const diaDate = dia ? new Date(dia) : undefined;

            console.log('Dados recebidos para atualizar liturgia:', {
                titulo,
                corLiturgica,
                primeiraLeitura,
                salmoResponsorial,
                segundaLeitura,
                evangelho,
                dia: diaDate,
                usuarioId,
            });

            const liturgiaAtualizada = await EditarLiturgiaService.editarLiturgia(id, {
                titulo,
                corLiturgica,
                primeiraLeitura,
                salmoResponsorial,
                segundaLeitura,
                evangelho,
                dia: diaDate,
                usuarioId
            });

            return res.status(200).json(liturgiaAtualizada);
        } catch (error: any) {
            return res.status(error.statusCode || 500).json({ mensagem: error.message });
        }
    }
}

export default EditarLiturgiaController;
