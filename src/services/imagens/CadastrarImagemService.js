"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CadastrarImagemService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class CadastrarImagemService {
    async execute({ titulo, descricao, url, autorId }) {
        try {
            const imagem = await prisma.imagem.create({
                data: {
                    titulo,
                    descricao,
                    url,
                    autorId,
                },
            });
            return imagem;
        }
        catch (error) {
            console.error("Erro ao cadastrar imagem:", error);
            throw new Error("Erro ao cadastrar imagem.");
        }
    }
}
exports.CadastrarImagemService = CadastrarImagemService;
