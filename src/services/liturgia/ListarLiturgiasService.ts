import { PrismaClient } from "@prisma/client";
import { toZonedTime } from "date-fns-tz";
import { addDays, startOfDay, parseISO } from "date-fns";

const prisma = new PrismaClient();

class ListarLiturgiaDoDiaService {
    async execute(dateParam?: string) {
        const timeZone = 'America/Sao_Paulo';

        let baseDate: Date;

        if (dateParam) {
            // Converte a data yyyy-mm-dd para o fuso de SP
            const parsed = parseISO(dateParam);
            baseDate = toZonedTime(parsed, timeZone);
        } else {
            // Usa a data de hoje se nenhuma data for enviada
            baseDate = toZonedTime(new Date(), timeZone);
        }

        const inicioDoDia = startOfDay(baseDate);
        const inicioDoDiaSeguinte = addDays(inicioDoDia, 1);

        const liturgia = await prisma.liturgia.findFirst({
            where: {
                dia: {
                    gte: inicioDoDia,
                    lt: inicioDoDiaSeguinte,
                },
            },
        });

        return liturgia;
    }
}

export { ListarLiturgiaDoDiaService };
