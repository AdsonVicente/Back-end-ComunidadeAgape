"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditarConteudoService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class EditarConteudoService {
    async execute({ id, titulo, descricao, categoria, autor, banner }) {
        const conteudo = await prisma.conteudo.update({
            where: { id },
            data: {
                titulo,
                descricao,
                categoria,
                autor,
                ...(banner && { banner }) // só atualiza se for enviado
            }
        });
        return conteudo;
    }
}
exports.EditarConteudoService = EditarConteudoService;
