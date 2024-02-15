/*
  Warnings:

  - Added the required column `banner` to the `Server` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Server" ADD COLUMN     "banner" TEXT NOT NULL,
ADD COLUMN     "image" TEXT[];
