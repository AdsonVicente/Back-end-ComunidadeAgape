import { PrismaClient } from '@prisma/client';
import { NotFoundError, BadRequestError } from '../../utils/api-errors';

const prisma = new PrismaClient();

interface EditarLiturgiaDTO {
  titulo?: string;
  corLiturgica?: string;
  primeiraLeitura?: string;
  salmoResponsorial?: string;
  segundaLeitura?: string;
  evangelho?: string;
  dia?: Date;
}

class LiturgiaService {
  async editarLiturgia(id: string, data: EditarLiturgiaDTO) {
    const liturgia = await prisma.liturgia.findUnique({ where: { id } });

    if (!liturgia) {
      throw new NotFoundError('Liturgia não encontrada.');
    }

    const camposAtualizar: any = {
      titulo: data.titulo,
      corLiturgica: data.corLiturgica,
      primeiraLeitura: data.primeiraLeitura,
      salmoResponsorial: data.salmoResponsorial,
      segundaLeitura: data.segundaLeitura,
      evangelho: data.evangelho,
      dia: data.dia,
      atualizadoEm: new Date(),
    };

    const dadosLimpos = Object.fromEntries(
      Object.entries(camposAtualizar).filter(([_, v]) => v !== undefined)
    );

    if (Object.keys(dadosLimpos).length === 1) {
      throw new BadRequestError('Nenhum campo fornecido para atualização.');
    }

    const liturgiaAtualizada = await prisma.liturgia.update({
      where: { id },
      data: dadosLimpos,
    });

    return liturgiaAtualizada;
  }
}

export default new LiturgiaService();
