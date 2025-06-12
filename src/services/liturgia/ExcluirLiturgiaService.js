"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.excluirLiturgiaService = excluirLiturgiaService;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function excluirLiturgiaService(id) {
    try {
        // Verifica se a liturgia existe antes de tentar excluir
        const liturgiaExistente = await prisma.liturgia.findUnique({
            where: { id },
        });
        if (!liturgiaExistente) {
            throw new Error('Liturgia não encontrada');
        }
        await prisma.liturgia.delete({
            where: { id },
        });
    }
    catch (error) {
        // Você pode lançar o erro para o controller tratar
        throw error;
    }
}
