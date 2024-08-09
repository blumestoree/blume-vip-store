/*
  Warnings:

  - Added the required column `date` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nickname` to the `UserOnServer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "UserOnServer" ADD COLUMN     "nickname" TEXT NOT NULL;
