/*
  Warnings:

  - You are about to drop the column `configurationId` on the `categories` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[categoryId]` on the table `configurations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryId` to the `configurations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_configurationId_fkey";

-- DropIndex
DROP INDEX "categories_configurationId_key";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "configurationId";

-- AlterTable
ALTER TABLE "configurations" ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "configurations_categoryId_key" ON "configurations"("categoryId");

-- AddForeignKey
ALTER TABLE "configurations" ADD CONSTRAINT "configurations_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
