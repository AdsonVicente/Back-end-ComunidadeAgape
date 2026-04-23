"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletarEventoService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class DeletarEventoService {
    async execute(id) {
        await prisma.evento.delete({ where: { id } });
        return { mensagem: "Evento deletado com sucesso." };
    }
}
exports.DeletarEventoService = DeletarEventoService;
