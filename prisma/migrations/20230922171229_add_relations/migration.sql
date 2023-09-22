/*
  Warnings:

  - You are about to drop the column `productId` on the `Server` table. All the data in the column will be lost.
  - You are about to drop the column `serverId` on the `ServerOwner` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[serverOwnerId]` on the table `Server` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `serverOwnerId` to the `Server` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Server" DROP CONSTRAINT "Server_productId_fkey";

-- DropForeignKey
ALTER TABLE "ServerOwner" DROP CONSTRAINT "ServerOwner_serverId_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "serverId" INTEGER;

-- AlterTable
ALTER TABLE "Server" DROP COLUMN "productId",
ADD COLUMN     "serverOwnerId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ServerOwner" DROP COLUMN "serverId";

-- CreateIndex
CREATE UNIQUE INDEX "Server_serverOwnerId_key" ON "Server"("serverOwnerId");

-- AddForeignKey
ALTER TABLE "Server" ADD CONSTRAINT "Server_serverOwnerId_fkey" FOREIGN KEY ("serverOwnerId") REFERENCES "ServerOwner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server"("id") ON DELETE SET NULL ON UPDATE CASCADE;
