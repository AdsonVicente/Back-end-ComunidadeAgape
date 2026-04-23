import { PrismaClient } from '@prisma/client';
import { NotFoundError } from '../../utils/api-errors';

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

    // Remove somente valores undefined, mas mantém atualizadoEm sempre
    const dadosLimpos = Object.fromEntries(
      Object.entries(camposAtualizar).filter(([_, v]) => v !== undefined)
    );

    // Se SOMENTE atualizadoEm estiver presente, não dá erro — apenas atualiza o timestamp
    const liturgiaAtualizada = await prisma.liturgia.update({
      where: { id },
      data: dadosLimpos,
    });

    return liturgiaAtualizada;
  }
}

export default new LiturgiaService();
