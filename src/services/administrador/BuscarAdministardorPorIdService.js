"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuscarAdministradorPorIdService = void 0;
// services/administrador/BuscarAdministradorPorIdService.ts
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class BuscarAdministradorPorIdService {
    async execute(user_id) {
        if (!user_id) {
            throw new Error("ID do usuário não fornecido.");
        }
        const user = await prisma.administrador.findUnique({
            where: { id: user_id },
            select: {
                id: true,
                nome: true,
                email: true,
                createdAt: true,
            },
        });
        return user;
    }
}
exports.BuscarAdministradorPorIdService = BuscarAdministradorPorIdService;
