/*
  Warnings:

  - You are about to drop the column `serverServerId` on the `Category` table. All the data in the column will be lost.
  - Added the required column `serverId` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_serverServerId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "serverServerId",
ADD COLUMN     "serverId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server"("serverId") ON DELETE RESTRICT ON UPDATE CASCADE;
