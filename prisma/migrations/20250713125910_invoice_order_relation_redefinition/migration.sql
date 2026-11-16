/*
  Warnings:

  - You are about to drop the column `orderId` on the `invoice` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[invoiceId]` on the table `order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `invoiceId` to the `order` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `order` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "invoice" DROP CONSTRAINT "invoice_orderId_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_userId_fkey";

-- DropIndex
DROP INDEX "invoice_orderId_key";

-- AlterTable
ALTER TABLE "invoice" DROP COLUMN "orderId";

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "invoiceId" INTEGER NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "order_invoiceId_key" ON "order"("invoiceId");

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
