"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditarAdministradorService = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
class EditarAdministradorService {
    async execute({ id, nome, email, senha }) {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(id)) {
            throw new Error("ID inválido. Deve ser um UUID.");
        }
        const adminExistente = await prisma.administrador.findUnique({ where: { id } });
        if (!adminExistente) {
            throw new Error("Administrador não encontrado.");
        }
        // Prepara dados para atualização, omitindo undefined
        const dadosParaAtualizar = {
            updatedAt: new Date(),
        };
        if (nome !== undefined)
            dadosParaAtualizar.nome = nome;
        if (email !== undefined)
            dadosParaAtualizar.email = email;
        if (senha !== undefined) {
            dadosParaAtualizar.senha = await bcryptjs_1.default.hash(senha, 10);
        }
        const administradorAtualizado = await prisma.administrador.update({
            where: { id },
            data: dadosParaAtualizar,
        });
        return administradorAtualizado;
    }
}
exports.EditarAdministradorService = EditarAdministradorService;
