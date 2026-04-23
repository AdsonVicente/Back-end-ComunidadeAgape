"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditarEventoService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class EditarEventoService {
    async execute({ id, titulo, descricao, local, data, horario, banner }) {
        // monta o objeto de atualização
        const updateData = {
            titulo,
            descricao,
            local,
            data: new Date(data),
            horario,
        };
        // só adiciona banner se ele for passado
        if (banner) {
            updateData.banner = banner;
        }
        const evento = await prisma.evento.update({
            where: { id },
            data: updateData,
        });
        return evento;
    }
}
exports.EditarEventoService = EditarEventoService;
