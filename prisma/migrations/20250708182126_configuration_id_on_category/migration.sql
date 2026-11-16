/*
  Warnings:

  - You are about to drop the column `categoryId` on the `configurations` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[configurationId]` on the table `categories` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "configurations" DROP CONSTRAINT "configurations_categoryId_fkey";

-- DropIndex
DROP INDEX "configurations_categoryId_key";

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "configurationId" INTEGER;

-- AlterTable
ALTER TABLE "configurations" DROP COLUMN "categoryId";

-- CreateIndex
CREATE UNIQUE INDEX "categories_configurationId_key" ON "categories"("configurationId");

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_configurationId_fkey" FOREIGN KEY ("configurationId") REFERENCES "configurations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
