import { Request, Response } from "express";
import { AuthAdministradorService } from "../../services/administrador/AuthAdministradotService";

class AuthAdministradorController {
    async handle(req: Request, res: Response) {
        try {
            const { email, senha } = req.body;

            if (!email || !senha) {
                return res.status(400).json({ error: "E-mail e senha são obrigatórios." });
            }

            const authAdministradorService = new AuthAdministradorService();

            const authData = await authAdministradorService.execute({
                email,
                senha,
            });

            return res.status(200).json(authData);

        } catch (error: any) {
            console.error("Erro na autenticação:", error.message);
            return res.status(401).json({ error: "Credenciais inválidas ou erro interno." });
        }
    }
}

export { AuthAdministradorController };
