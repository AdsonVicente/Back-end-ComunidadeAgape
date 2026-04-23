"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListarInscricoesService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ListarInscricoesService {
    async execute() {
        const inscricoes = await prisma.inscricao.findMany({
            include: { evento: true }, // para trazer dados do evento, se quiser
        });
        return inscricoes;
    }
}
exports.ListarInscricoesService = ListarInscricoesService;
