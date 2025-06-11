"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthAdministradorController = void 0;
const AuthAdministradotService_1 = require("../../services/administrador/AuthAdministradotService");
class AuthAdministradorController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, senha } = req.body;
                if (!email || !senha) {
                    return res.status(400).json({ error: "E-mail e senha são obrigatórios." });
                }
                const authAdministradorService = new AuthAdministradotService_1.AuthAdministradorService();
                const authData = yield authAdministradorService.execute({
                    email,
                    senha,
                });
                return res.status(200).json(authData);
            }
            catch (error) {
                console.error("Erro na autenticação:", error.message);
                return res.status(401).json({ error: "Credenciais inválidas ou erro interno." });
            }
        });
    }
}
exports.AuthAdministradorController = AuthAdministradorController;
