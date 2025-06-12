"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListarConteudosService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ListarConteudosService {
    async execute() {
        const conteudos = await prisma.conteudo.findMany({
            orderBy: {
                publicadoEm: "desc"
            },
            include: {
                category: {
                    select: {
                        id: true,
                        nome: true
                    }
                }
            }
        });
        return conteudos;
    }
}
exports.ListarConteudosService = ListarConteudosService;
