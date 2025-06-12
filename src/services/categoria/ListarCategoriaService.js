"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListarCategoriaService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ListarCategoriaService {
    async execute() {
        const categorias = await prisma.categoria.findMany({
            select: {
                id: true,
                nome: true,
            }
        });
        return categorias;
    }
}
exports.ListarCategoriaService = ListarCategoriaService;
