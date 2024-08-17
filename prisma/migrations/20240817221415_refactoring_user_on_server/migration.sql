/*
  Warnings:

  - The primary key for the `UserOnServer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[userOnServerId]` on the table `UserOnServer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userOnServerId` to the `UserOnServer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserOnServer" DROP CONSTRAINT "UserOnServer_pkey",
ADD COLUMN     "userOnServerId" TEXT NOT NULL,
ADD CONSTRAINT "UserOnServer_pkey" PRIMARY KEY ("userOnServerId");

-- CreateIndex
CREATE UNIQUE INDEX "UserOnServer_userOnServerId_key" ON "UserOnServer"("userOnServerId");
