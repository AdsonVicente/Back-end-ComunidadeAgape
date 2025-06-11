"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CriarAdministradorService = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = require("bcryptjs");
const prisma = new client_1.PrismaClient();
class CriarAdministradorService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ nome, email, senha }) {
            if (!email) {
                throw new Error("Email é obrigatorio");
            }
            const userAlreadyExists = yield prisma.administrador.findFirst({
                where: {
                    email: email
                }
            });
            if (userAlreadyExists) {
                throw new Error("Email já cadastrado!");
            }
            const passwordHash = yield (0, bcryptjs_1.hash)(senha, 8);
            const administrador = yield prisma.administrador.create({
                data: {
                    id: crypto.randomUUID(),
                    nome: nome,
                    email: email,
                    senha: passwordHash,
                },
                select: {
                    id: true,
                    nome: true,
                    email: true,
                }
            });
            return administrador;
        });
    }
}
exports.CriarAdministradorService = CriarAdministradorService;
1;
