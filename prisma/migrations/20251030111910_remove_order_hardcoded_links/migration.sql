/*
  Warnings:

  - You are about to drop the column `hostedInvoiceUrl` on the `invoice` table. All the data in the column will be lost.
  - You are about to drop the column `invoicePdfUrl` on the `invoice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "invoice" DROP COLUMN "hostedInvoiceUrl",
DROP COLUMN "invoicePdfUrl";
