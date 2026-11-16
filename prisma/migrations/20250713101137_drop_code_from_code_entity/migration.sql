/*
  Warnings:

  - You are about to drop the column `code` on the `codes` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "codes_code_key";

-- AlterTable
ALTER TABLE "codes" DROP COLUMN "code";
