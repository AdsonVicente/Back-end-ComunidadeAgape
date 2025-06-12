"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CadastrarConteudoService = void 0;
const client_1 = require("@prisma/client");
const crypto_1 = __importDefault(require("crypto"));
const prisma = new client_1.PrismaClient();
class CadastrarConteudoService {
    async execute({ titulo, descricao, categoria, banner, autor }) {
        const id = crypto_1.default.randomUUID();
        try {
            const conteudo = await prisma.conteudo.create({
                data: {
                    id,
                    titulo,
                    descricao,
                    banner,
                    autor,
                    category: {
                        connect: {
                            id: categoria
                        }
                    }
                }
            });
            return conteudo;
        }
        catch (error) {
            console.error("Erro ao criar conteúdo no Prisma:", error.message);
            console.error(error.stack);
            throw new Error("Erro ao cadastrar conteúdo.");
        }
    }
}
exports.CadastrarConteudoService = CadastrarConteudoService;
