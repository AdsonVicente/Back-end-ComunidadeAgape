"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CriarInscricaoService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class CriarInscricaoService {
    async execute({ nome, email, telefone, idade, grupo, setor, eventoId }) {
        const evento = await prisma.evento.findUnique({
            where: { id: eventoId },
        });
        if (!evento) {
            throw new Error("Evento não encontrado no sistema.");
        }
        const inscricao = await prisma.inscricao.create({
            data: {
                id: crypto.randomUUID(),
                nome,
                email,
                telefone,
                idade,
                grupo,
                setor,
                evento: {
                    connect: { id: eventoId }
                }
            }
        });
        return inscricao;
    }
}
exports.CriarInscricaoService = CriarInscricaoService;
