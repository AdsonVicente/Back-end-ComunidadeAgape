"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcluirInscricaoService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ExcluirInscricaoService {
    async execute(id) {
        const inscricao = await prisma.inscricao.delete({ where: { id } });
        return inscricao;
    }
}
exports.ExcluirInscricaoService = ExcluirInscricaoService;
