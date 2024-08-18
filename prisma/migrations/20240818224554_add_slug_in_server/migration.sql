/*
  Warnings:

  - Added the required column `slug` to the `Server` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Server" ADD COLUMN     "slug" TEXT NOT NULL;
