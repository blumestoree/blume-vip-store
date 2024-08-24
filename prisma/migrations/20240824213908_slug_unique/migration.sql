/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Server` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Server_slug_key" ON "Server"("slug");
