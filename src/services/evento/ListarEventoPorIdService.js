"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListarEventoPorIdService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ListarEventoPorIdService {
    async execute(id) {
        const evento = await prisma.evento.findUnique({
            where: { id },
        });
        return evento;
    }
}
exports.ListarEventoPorIdService = ListarEventoPorIdService;
