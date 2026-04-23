"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CriarEventoService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class CriarEventoService {
    async execute({ titulo, descricao, local, data, horario, banner }) {
        const evento = await prisma.evento.create({
            data: {
                id: crypto.randomUUID(),
                titulo,
                descricao,
                local,
                data: new Date(data),
                horario,
                banner,
            }
        });
        return evento;
    }
}
exports.CriarEventoService = CriarEventoService;
