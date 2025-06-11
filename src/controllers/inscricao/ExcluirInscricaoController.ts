import { Request, Response } from "express";
import { ExcluirInscricaoService } from "../../services/inscricao/ExcluirInscricaoService";

class ExcluirInscricaoController {
    async handle(req: Request, res: Response) {
        const { id } = req.params;
        const service = new ExcluirInscricaoService();

        try {
            const inscricao = await service.execute(id);
            return res.json({ message: "Inscrição excluída com sucesso." });
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { ExcluirInscricaoController };
