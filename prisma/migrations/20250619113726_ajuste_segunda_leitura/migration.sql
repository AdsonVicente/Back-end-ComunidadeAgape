-- AlterTable
ALTER TABLE "Inscricoes" ALTER COLUMN "grupo" DROP NOT NULL,
ALTER COLUMN "setor" DROP NOT NULL;

-- AlterTable
ALTER TABLE "liturgias" ALTER COLUMN "segundaLeitura" DROP NOT NULL;
