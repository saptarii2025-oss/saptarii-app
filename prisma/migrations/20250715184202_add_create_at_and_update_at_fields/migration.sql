/*
  Warnings:

  - Added the required column `updatedAt` to the `configurations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "configurations" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "invoice" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
