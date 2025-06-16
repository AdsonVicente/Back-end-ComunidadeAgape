/*
  Warnings:

  - You are about to drop the `Configuracao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Contato` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Doacao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notificacao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoria` to the `Galeria` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Galeria" ADD COLUMN     "categoria" UUID NOT NULL;

-- DropTable
DROP TABLE "Configuracao";

-- DropTable
DROP TABLE "Contato";

-- DropTable
DROP TABLE "Doacao";

-- DropTable
DROP TABLE "Notificacao";

-- DropTable
DROP TABLE "Usuario";
