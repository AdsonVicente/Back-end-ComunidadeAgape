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
exports.ListarLiturgiaDoDiaService = void 0;
const client_1 = require("@prisma/client");
const date_fns_tz_1 = require("date-fns-tz");
const date_fns_1 = require("date-fns");
const prisma = new client_1.PrismaClient();
class ListarLiturgiaDoDiaService {
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const timeZone = 'America/Sao_Paulo'; // fuso horário de São Paulo
            // Pega a data atual convertida para o fuso horário de São Paulo
            const hojeZoned = (0, date_fns_tz_1.toZonedTime)(new Date(), timeZone);
            // Início do dia no fuso horário local
            const hoje = (0, date_fns_1.startOfDay)(hojeZoned);
            // Início do próximo dia
            const amanha = (0, date_fns_1.addDays)(hoje, 1);
            const liturgia = yield prisma.liturgia.findFirst({
                where: {
                    dia: {
                        gte: hoje,
                        lt: amanha,
                    },
                },
            });
            return liturgia;
        });
    }
}
exports.ListarLiturgiaDoDiaService = ListarLiturgiaDoDiaService;
