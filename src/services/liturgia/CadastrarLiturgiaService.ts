import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
interface LiturgiaRequest {
    titulo: string;
    corLiturgica: string;
    primeiraLeitura: string;
    salmoResponsorial: string;
    segundaLeitura?: string;
    evangelho: string;
    dia: Date;
}

const prisma = new PrismaClient();

class CadastrarLiturgiaService {
    async execute({
        titulo,
        corLiturgica,
        primeiraLeitura,
        salmoResponsorial,
        segundaLeitura,
        evangelho,
        dia
    }: LiturgiaRequest) {
        const liturgia = await prisma.liturgia.create({
            data: {
                id: crypto.randomUUID(),
                titulo,
                corLiturgica,
                primeiraLeitura,
                salmoResponsorial,
                segundaLeitura: segundaLeitura?.trim() ? segundaLeitura : null,
                evangelho,
                dia
            }
        });

        return liturgia;
    }
}

export { CadastrarLiturgiaService };
