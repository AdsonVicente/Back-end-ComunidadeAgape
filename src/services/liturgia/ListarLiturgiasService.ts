import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ListarLiturgiasService {
    async execute() {
        const liturgias = await prisma.liturgia.findMany({
            orderBy: {
                dia: 'desc'
            }
        });

        return liturgias;
    }
}

export { ListarLiturgiasService };
