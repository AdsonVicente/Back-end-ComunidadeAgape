import { Request, Response } from "express";
import { CriarAdministradorService } from "../../services/administrador/CriarAdministradorService";

class CriarAdministradorController {
    async handle(req: Request, res: Response) {
        const { nome, email, senha } = req.body;

        const criarAdministradorService = new CriarAdministradorService();

        const administrador = await criarAdministradorService.execute({
            nome,
            email,
            senha
        });

        return res.json({ administrador })
    }
}
export { CriarAdministradorController };