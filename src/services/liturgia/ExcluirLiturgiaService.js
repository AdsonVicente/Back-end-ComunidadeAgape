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
exports.excluirLiturgiaService = excluirLiturgiaService;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function excluirLiturgiaService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Verifica se a liturgia existe antes de tentar excluir
            const liturgiaExistente = yield prisma.liturgia.findUnique({
                where: { id },
            });
            if (!liturgiaExistente) {
                throw new Error('Liturgia não encontrada');
            }
            yield prisma.liturgia.delete({
                where: { id },
            });
        }
        catch (error) {
            // Você pode lançar o erro para o controller tratar
            throw error;
        }
    });
}
