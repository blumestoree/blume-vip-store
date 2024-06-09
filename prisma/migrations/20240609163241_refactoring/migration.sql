/*
  Warnings:

  - You are about to drop the column `userId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Server` table. All the data in the column will be lost.
  - You are about to drop the column `gameUserId` on the `User` table. All the data in the column will be lost.
  - Added the required column `total` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_userId_fkey";

-- DropForeignKey
ALTER TABLE "Server" DROP CONSTRAINT "Server_userId_fkey";

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "total" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Server" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "gameUserId";

-- CreateTable
CREATE TABLE "UserOnServer" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "serverId" TEXT NOT NULL,
    "gameUserId" TEXT NOT NULL,

    CONSTRAINT "UserOnServer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserOnServer_userId_serverId_key" ON "UserOnServer"("userId", "serverId");

-- AddForeignKey
ALTER TABLE "UserOnServer" ADD CONSTRAINT "UserOnServer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnServer" ADD CONSTRAINT "UserOnServer_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server"("serverId") ON DELETE RESTRICT ON UPDATE CASCADE;
