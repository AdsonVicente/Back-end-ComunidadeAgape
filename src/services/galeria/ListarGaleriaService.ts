import { PrismaClient } from "@prisma/client";
// src/services/galeria/ListarGaleriaService.ts
const prisma = new PrismaClient();

export class ListarGaleriaService {
    async execute() {
        const imagens = await prisma.galeria.findMany({
            orderBy: {
                criadoEm: 'desc',
            },
            select: {
                id: true,
                titulo: true,
                imagemUrl: true,
                categoria: true
            },
        });

        return imagens;
    }
}
