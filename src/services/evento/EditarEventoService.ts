import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface EditarEventoRequest {
  id: string;
  titulo: string;
  descricao: string;
  local: string;
  data: string;
  horario: string;
  banner?: string; // banner é opcional
}

class EditarEventoService {
  async execute({ id, titulo, descricao, local, data, horario, banner }: EditarEventoRequest) {
    // monta o objeto de atualização
    const updateData: any = {
      titulo,
      descricao,
      local,
      data: new Date(data),
      horario,
    };

    // só adiciona banner se ele for passado
    if (banner) {
      updateData.banner = banner;
    }

    const evento = await prisma.evento.update({
      where: { id },
      data: updateData,
    });

    return evento;
  }
}

export { EditarEventoService };
