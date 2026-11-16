/*
  Warnings:

  - You are about to drop the column `inactiveAt` on the `codes` table. All the data in the column will be lost.
  - Added the required column `expiresAt` to the `codes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "codes" DROP COLUMN "inactiveAt",
ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL;
