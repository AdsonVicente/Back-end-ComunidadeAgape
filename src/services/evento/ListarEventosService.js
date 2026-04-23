"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListarEventosService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ListarEventosService {
    async execute() {
        const eventos = await prisma.evento.findMany({
            orderBy: {
                data: "asc"
            }
        });
        return eventos;
    }
}
exports.ListarEventosService = ListarEventosService;
