import { Request, Response } from "express";
import { CriarInscricaoService } from "../../services/inscricao/CadastrarInscricaoService";

CriarInscricaoService
class CriarInscricaoController {
    async handle(req: Request, res: Response) {
        const { nome, email, telefone, idade, grupo, setor, eventoId } = req.body;

        const criarInscricaoService = new CriarInscricaoService();

        try {
            const inscricao = await criarInscricaoService.execute({
                nome,
                email,
                telefone,
                idade,
                grupo,
                setor,
                eventoId,
            });

            return res.status(201).json(inscricao);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { CriarInscricaoController };
