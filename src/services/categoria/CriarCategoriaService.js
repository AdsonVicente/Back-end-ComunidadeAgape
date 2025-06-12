"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CriarCategoriaService = void 0;
const client_1 = __importDefault(require("@prisma/client"));
const prisma = new client_1.default.PrismaClient();
class CriarCategoriaService {
    async execute({ nome }) {
        if (!nome) {
            throw new Error("Nome da categoria é obrigatório");
        }
        const categoria = await prisma.categoria.create({
            data: {
                id: crypto.randomUUID(),
                nome
            },
            select: {
                id: true,
                nome: true,
            }
        });
        return categoria;
    }
}
exports.default = CriarCategoriaService;
exports.CriarCategoriaService = CriarCategoriaService;
