/*
  Warnings:

  - You are about to drop the `Galeria` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `email` to the `Contato` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contato" ADD COLUMN     "email" TEXT NOT NULL;

-- DropTable
DROP TABLE "Galeria";
