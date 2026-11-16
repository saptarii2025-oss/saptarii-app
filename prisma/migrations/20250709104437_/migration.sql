/*
  Warnings:

  - You are about to drop the column `documentId` on the `documents` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[key]` on the table `documents` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `key` to the `documents` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "documents_documentId_key";

-- AlterTable
ALTER TABLE "documents" DROP COLUMN "documentId",
ADD COLUMN     "key" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "documents_key_key" ON "documents"("key");
