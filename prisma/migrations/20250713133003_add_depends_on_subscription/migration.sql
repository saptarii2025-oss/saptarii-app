-- AlterTable
ALTER TABLE "subscriptions" ADD COLUMN     "dependsOnParentId" INTEGER;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_dependsOnParentId_fkey" FOREIGN KEY ("dependsOnParentId") REFERENCES "subscriptions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
