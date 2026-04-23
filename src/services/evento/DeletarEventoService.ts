import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class DeletarEventoService {
    async execute(id: string) {
        await prisma.evento.delete({ where: { id } });
        return { mensagem: "Evento deletado com sucesso." };
    }
}

export { DeletarEventoService };
