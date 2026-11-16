/*
  Warnings:

  - Added the required column `productsCurrency` to the `invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productsTotal` to the `invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "invoice" ADD COLUMN     "productsCurrency" TEXT NOT NULL,
ADD COLUMN     "productsTotal" DECIMAL(65,30) NOT NULL;
