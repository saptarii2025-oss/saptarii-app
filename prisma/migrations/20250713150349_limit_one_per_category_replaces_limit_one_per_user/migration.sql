/*
  Warnings:

  - You are about to drop the column `limitOnePerUser` on the `categories` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "categories" DROP COLUMN "limitOnePerUser",
ADD COLUMN     "limitOnePerCategory" BOOLEAN NOT NULL DEFAULT false;
