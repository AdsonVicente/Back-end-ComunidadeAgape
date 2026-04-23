import { Request, Response } from 'express';
import EditarLiturgiaService from '../../services/liturgia/EditarLiturgiaService';
import { BadRequestError } from '../../utils/api-errors';

class EditarLiturgiaController {
    async handle(req: Request, res: Response) {
        try {
            const { id } = req.params;

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

            console.log('Atualizando Liturgia:', {
                id,
                titulo,
                corLiturgica,
                primeiraLeitura,
                salmoResponsorial,
                segundaLeitura,
                evangelho,
                dia: diaDate
            });

            const liturgiaAtualizada = await EditarLiturgiaService.editarLiturgia(id, {
                titulo,
                corLiturgica,
                primeiraLeitura,
                salmoResponsorial,
                segundaLeitura,
                evangelho,
                dia: diaDate
            });

            return res.status(200).json(liturgiaAtualizada);

        } catch (error: any) {
            return res.status(error.statusCode || 500)
                .json({ mensagem: error.message });
        }
    }
}

export default EditarLiturgiaController;
