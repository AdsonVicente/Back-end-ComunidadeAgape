"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CadastrarLiturgiaService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class CadastrarLiturgiaService {
    async execute({ titulo, corLiturgica, primeiraLeitura, salmoResponsorial, segundaLeitura, evangelho, dia }) {
        const liturgia = await prisma.liturgia.create({
            data: {
                id: crypto.randomUUID(),
                titulo,
                corLiturgica,
                primeiraLeitura,
                salmoResponsorial,
                segundaLeitura: segundaLeitura || null,
                evangelho,
                dia
            }
        });
        return liturgia;
    }
}
exports.CadastrarLiturgiaService = CadastrarLiturgiaService;
