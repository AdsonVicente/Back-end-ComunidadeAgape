import { PrismaClient } from '@prisma/client';
import { UnauthorizedError, NotFoundError, BadRequestError } from '../../utils/api-errors';

const prisma = new PrismaClient();

interface EditarLiturgiaDTO {
  titulo?: string;
  corLiturgica?: string;
  primeiraLeitura?: string;
  salmoResponsorial?: string;
  segundaLeitura?: string;
  evangelho?: string;
  dia?: Date;
  usuarioId: string; // quem está tentando editar
}

class LiturgiaService {
  async editarLiturgia(id: string, data: EditarLiturgiaDTO) {
    const liturgia = await prisma.liturgia.findUnique({ where: { id } });
    if (!liturgia) {
      throw new NotFoundError('Liturgia não encontrada.');
    }

    const usuario = await prisma.administrador.findUnique({ where: { id: data.usuarioId } });
    if (!usuario) {
      throw new UnauthorizedError('Usuário não encontrado.');
    }

    // Ajuste: permitir apenas admins (ou donos, se liturgia tiver campo administradorId)
    if (!usuario.isAdmin) {
      throw new UnauthorizedError('Você não tem permissão para editar esta liturgia.');
    }

    // Verifica se ao menos um campo foi enviado
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

    // Remove campos indefinidos
    const dadosLimpos = Object.fromEntries(
      Object.entries(camposAtualizar).filter(([_, valor]) => valor !== undefined)
    );

    if (Object.keys(dadosLimpos).length === 1) {
      // só tem `atualizadoEm`
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
