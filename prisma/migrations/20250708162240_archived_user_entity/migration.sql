-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'ANONYMOUS';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "archivedAt" TIMESTAMP(3),
ADD COLUMN     "archivedById" TEXT,
ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_archivedById_fkey" FOREIGN KEY ("archivedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
