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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditarAdministradorService = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
class EditarAdministradorService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, nome, email, senha }) {
            console.log("ID recebido:", id); // para checar valor
            // talvez validar o UUID (opcional)
            const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
            if (!uuidRegex.test(id)) {
                throw new Error("ID inválido. Deve ser um UUID.");
            }
            const adminExistente = yield prisma.administrador.findUnique({
                where: { id },
            });
            if (!adminExistente) {
                throw new Error("Administrador não encontrado.");
            }
            const senhaCriptografada = senha ? yield bcryptjs_1.default.hash(senha, 10) : undefined;
            const administradorAtualizado = yield prisma.administrador.update({
                where: { id },
                data: {
                    nome,
                    email,
                    senha: senhaCriptografada,
                    updatedAt: new Date(),
                },
            });
            return administradorAtualizado;
        });
    }
}
exports.EditarAdministradorService = EditarAdministradorService;
