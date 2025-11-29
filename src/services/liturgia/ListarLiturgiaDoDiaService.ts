import { PrismaClient } from "@prisma/client";
import { toZonedTime } from "date-fns-tz";
import { addDays, startOfDay } from "date-fns";

const prisma = new PrismaClient();

class ListarLiturgiaDoDiaService {
    async execute(dateString?: string) {
        const timeZone = "America/Sao_Paulo";

        let baseDate: Date;

        if (dateString) {
            // Criar uma data REAL local
            const [year, month, day] = dateString.split("-").map(Number);
            const localDate = new Date(year, month - 1, day, 0, 0, 0);

            // Ajustar para timezone de São Paulo
            baseDate = toZonedTime(localDate, timeZone);
        } else {
            // Data atual
            baseDate = toZonedTime(new Date(), timeZone);
        }

        const inicioDia = startOfDay(baseDate);
        const fimDia = addDays(inicioDia, 1);

        const liturgia = await prisma.liturgia.findFirst({
            where: {
                dia: {
                    gte: inicioDia,
                    lt: fimDia,
                },
            },
        });

        return liturgia;
    }
}

export { ListarLiturgiaDoDiaService };
