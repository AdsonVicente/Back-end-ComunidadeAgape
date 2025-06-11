import { Request, Response } from "express";
import { CadastrarLiturgiaService } from "../../services/liturgia/CadastrarLiturgiaService";

class CadastrarLiturgiaController {
    async handle(req: Request, res: Response) {
        const {
            titulo,
            corLiturgica,
            primeiraLeitura,
            salmoResponsorial,
            segundaLeitura,
            evangelho,
            dia
        } = req.body;

        const service = new CadastrarLiturgiaService();

        try {
            const liturgia = await service.execute({
                titulo,
                corLiturgica,
                primeiraLeitura,
                salmoResponsorial,
                segundaLeitura,
                evangelho,
                dia: new Date(dia)
            });

            return res.status(201).json(liturgia);
        } catch (error) {
            console.error("Erro ao cadastrar liturgia:", error);
            return res.status(500).json({ error: "Erro ao cadastrar liturgia diária." });
        }
    }
}

export { CadastrarLiturgiaController };
