import { PrismaClient } from "@prisma/client";
import { toZonedTime } from "date-fns-tz";
import { addDays, startOfDay } from "date-fns";

const prisma = new PrismaClient();

class ListarLiturgiaDoDiaService {
    async execute(p0: string | undefined) {
        const timeZone = 'America/Sao_Paulo'; // fuso horário de São Paulo
        
        // Pega a data atual convertida para o fuso horário de São Paulo
        const hojeZoned = toZonedTime(new Date(), timeZone);

        // Início do dia no fuso horário local
        const hoje = startOfDay(hojeZoned);

        // Início do próximo dia
        const amanha = addDays(hoje, 1);

        const liturgia = await prisma.liturgia.findFirst({
            where: {
                dia: {
                    gte: hoje,
                    lt: amanha,
                },
            },
        });

        return liturgia;
    }
}

export { ListarLiturgiaDoDiaService };
