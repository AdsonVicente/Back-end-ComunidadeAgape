"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdministradoresDetalhesService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class AdministradoresDetalhesService {
    async execute() {
        const admins = await prisma.administrador.findMany({
            select: {
                id: true,
                nome: true,
                email: true,
                createdAt: true
            },
        });
        return admins;
    }
}
exports.AdministradoresDetalhesService = AdministradoresDetalhesService;
