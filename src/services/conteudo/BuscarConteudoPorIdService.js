"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuscarConteudoPorIdService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class BuscarConteudoPorIdService {
    async execute(id) {
        if (!id) {
            throw new Error("ID do conteúdo não foi fornecido.");
        }
        const conteudo = await prisma.conteudo.findUnique({
            where: { id },
            include: {
                category: true,
            },
        });
        if (!conteudo) {
            throw new Error("Conteúdo não encontrado.");
        }
        return conteudo;
    }
}
exports.BuscarConteudoPorIdService = BuscarConteudoPorIdService;
