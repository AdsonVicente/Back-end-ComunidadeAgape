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
exports.EditarEventoService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class EditarEventoService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, titulo, descricao, local, data, horario, banner }) {
            // monta o objeto de atualização
            const updateData = {
                titulo,
                descricao,
                local,
                data: new Date(data),
                horario,
            };
            // só adiciona banner se ele for passado
            if (banner) {
                updateData.banner = banner;
            }
            const evento = yield prisma.evento.update({
                where: { id },
                data: updateData,
            });
            return evento;
        });
    }
}
exports.EditarEventoService = EditarEventoService;
