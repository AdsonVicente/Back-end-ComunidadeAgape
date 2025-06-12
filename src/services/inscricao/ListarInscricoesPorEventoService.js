"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListarInscricoesPorEventoService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ListarInscricoesPorEventoService {
    async execute(eventId) {
        const inscricoes = await prisma.inscricao.findMany({
            where: { eventId },
        });
        return inscricoes;
    }
}
exports.ListarInscricoesPorEventoService = ListarInscricoesPorEventoService;
