"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthAdministradorService = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthAdministradorService {
    async execute({ email, senha }) {
        const prisma = new client_1.PrismaClient();
        if (!email) {
            throw new Error("Email é obrigatório");
        }
        if (!senha) {
            throw new Error("Senha é obrigatória");
        }
        const administrador = await prisma.administrador.findFirst({
            where: {
                email: email
            }
        });
        if (!administrador) {
            throw new Error("Email ou senha incorretos!");
        }
        const senhaMatch = await (0, bcryptjs_1.compare)(senha, administrador.senha);
        if (!senhaMatch) {
            throw new Error("Email ou senha incorretos!");
        }
        const token = (0, jsonwebtoken_1.sign)({
            nome: administrador.nome,
            email: administrador.email,
        }, process.env.JWT_SECRET, {
            subject: administrador.id,
            expiresIn: "30d",
        });
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET não está definido nas variáveis de ambiente.");
        }
        return {
            id: administrador.id,
            nome: administrador.nome,
            email: administrador.email,
            token: token
        };
    }
}
exports.AuthAdministradorService = AuthAdministradorService;
