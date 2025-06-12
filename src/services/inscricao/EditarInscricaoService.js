"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditarInscricaoService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class EditarInscricaoService {
    async execute({ id, ...dados }) {
        const inscricaoExistente = await prisma.inscricao.findUnique({ where: { id } });
        if (!inscricaoExistente) {
            throw new Error("Inscrição não encontrada.");
        }
        const inscricao = await prisma.inscricao.update({
            where: { id },
            data: dados,
        });
        return inscricao;
    }
}
exports.EditarInscricaoService = EditarInscricaoService;
