import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface EditarConteudoRequest {
    id: string;
    titulo: string;
    descricao: string;
    categoria: string;
    autor: string;
    banner?: string;
}

class EditarConteudoService {
    async execute({ id, titulo, descricao, categoria, autor, banner }: EditarConteudoRequest) {
        const conteudo = await prisma.conteudo.update({
            where: { id },
            data: {
                titulo,
                descricao,
                categoria,
                autor,
                ...(banner && { banner }) // só atualiza se for enviado
            }
        });

        return conteudo;
    }
}

export { EditarConteudoService };
