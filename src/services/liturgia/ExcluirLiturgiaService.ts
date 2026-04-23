import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function excluirLiturgiaService(id: string): Promise<void> {
    try {
        // Verifica se a liturgia existe antes de tentar excluir
        const liturgiaExistente = await prisma.liturgia.findUnique({
            where: { id },
        });

        if (!liturgiaExistente) {
            throw new Error('Liturgia não encontrada');
        }

        await prisma.liturgia.delete({
            where: { id },
        });
    } catch (error) {
        // Você pode lançar o erro para o controller tratar
        throw error;
    }
}
