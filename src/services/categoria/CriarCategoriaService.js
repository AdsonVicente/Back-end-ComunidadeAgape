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
exports.CriarCategoriaService = void 0;
const client_1 = __importDefault(require("@prisma/client"));
const prisma = new client_1.default.PrismaClient();
class CriarCategoriaService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ nome }) {
            if (!nome) {
                throw new Error("Nome da categoria é obrigatório");
            }
            const categoria = yield prisma.categoria.create({
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
        });
    }
}
exports.default = CriarCategoriaService;
exports.CriarCategoriaService = CriarCategoriaService;
