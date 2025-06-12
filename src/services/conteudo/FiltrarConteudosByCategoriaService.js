"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FiltrarConteudosByCategoriaService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class FiltrarConteudosByCategoriaService {
    async execute({ categoria }) {
        const conteudos = await prisma.conteudo.findMany({
            where: {
                category: {
                    id: categoria
                }
            },
        });
        return conteudos;
    }
}
exports.FiltrarConteudosByCategoriaService = FiltrarConteudosByCategoriaService;
