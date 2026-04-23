"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CriarAdministradorService = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = require("bcryptjs");
const prisma = new client_1.PrismaClient();
class CriarAdministradorService {
    async execute({ nome, email, senha }) {
        if (!email) {
            throw new Error("Email é obrigatorio");
        }
        const userAlreadyExists = await prisma.administrador.findFirst({
            where: {
                email: email
            }
        });
        if (userAlreadyExists) {
            throw new Error("Email já cadastrado!");
        }
        const passwordHash = await (0, bcryptjs_1.hash)(senha, 8);
        const administrador = await prisma.administrador.create({
            data: {
                id: crypto.randomUUID(),
                nome: nome,
                email: email,
                senha: passwordHash,
            },
            select: {
                id: true,
                nome: true,
                email: true,
            }
        });
        return administrador;
    }
}
exports.CriarAdministradorService = CriarAdministradorService;
1;
