import { PrismaClient } from '@prisma/client';
import { NotFoundError } from '../../utils/api-errors';

const prisma = new PrismaClient();

class BuscarLiturgiaPorIdService {
  async execute(id: string) {
    const liturgia = await prisma.liturgia.findUnique({ where: { id } });

    if (!liturgia) {
      throw new NotFoundError('Liturgia não encontrada.');
    }

    return liturgia;
  }
}

export { BuscarLiturgiaPorIdService };
