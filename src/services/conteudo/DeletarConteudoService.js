"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletarConteudoService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class DeletarConteudoService {
    async execute(id) {
        await prisma.conteudo.delete({
            where: { id }
        });
        return { mensagem: "Conteúdo deletado com sucesso." };
    }
}
exports.DeletarConteudoService = DeletarConteudoService;
