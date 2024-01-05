/*
  Warnings:

  - Added the required column `functionInGame` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gameItemName` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userGameId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "functionInGame" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "gameItemName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userGameId" TEXT NOT NULL;
