import { PrismaClient } from "@prisma/client";
import { startOfDay, endOfDay } from "date-fns";

const prisma = new PrismaClient();

class ListarLiturgiaDoDiaService {
    async execute(dateString?: string) {
        let baseDate: Date;

        if (dateString) {
            // Garantir que é sempre meia-noite no horário local
            const [year, month, day] = dateString.split("-").map(Number);
            baseDate = new Date(year, month - 1, day, 12, 0, 0); 
            // 12:00 evita problemas de UTC jogando um dia para trás
        } else {
            // Data atual do servidor, mas ajustada para evitar problemas de UTC
            const now = new Date();
            baseDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0);
        }

        // Intervalo correto do dia inteiro
        const inicioDia = startOfDay(baseDate);
        const fimDia = endOfDay(baseDate);

        const liturgia = await prisma.liturgia.findFirst({
            where: {
                dia: {
                    gte: inicioDia,
                    lte: fimDia,
                },
            },
        });

        return liturgia;
    }
}

export { ListarLiturgiaDoDiaService };
