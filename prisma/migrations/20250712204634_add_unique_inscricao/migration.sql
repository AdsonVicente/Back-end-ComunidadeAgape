/*
  Warnings:

  - A unique constraint covering the columns `[email,eventId]` on the table `Inscricoes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Inscricoes_email_eventId_key" ON "Inscricoes"("email", "eventId");
