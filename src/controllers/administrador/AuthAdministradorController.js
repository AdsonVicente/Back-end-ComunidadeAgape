"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthAdministradorController = void 0;
const AuthAdministradotService_1 = require("../../services/administrador/AuthAdministradotService");
class AuthAdministradorController {
    async handle(req, res) {
        try {
            const { email, senha } = req.body;
            if (!email || !senha) {
                return res.status(400).json({ error: "E-mail e senha são obrigatórios." });
            }
            const authAdministradorService = new AuthAdministradotService_1.AuthAdministradorService();
            const authData = await authAdministradorService.execute({
                email,
                senha,
            });
            return res.status(200).json(authData);
        }
        catch (error) {
            console.error("Erro na autenticação:", error.message);
            return res.status(401).json({ error: "Credenciais inválidas ou erro interno." });
        }
    }
}
exports.AuthAdministradorController = AuthAdministradorController;
