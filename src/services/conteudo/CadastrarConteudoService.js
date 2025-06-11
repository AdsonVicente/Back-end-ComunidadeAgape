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
exports.CadastrarConteudoService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class CadastrarConteudoService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ titulo, descricao, categoria, banner, autor }) {
            const id = crypto.randomUUID();
            try {
                const conteudo = yield prisma.conteudo.create({
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
                console.error("Erro ao criar conteúdo:", error);
                throw new Error("Erro ao cadastrar conteúdo.");
            }
        });
    }
}
exports.CadastrarConteudoService = CadastrarConteudoService;
