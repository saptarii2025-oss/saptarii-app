-- CreateTable
CREATE TABLE "houses" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "inventory" INTEGER NOT NULL DEFAULT 0,
    "taxPrice" DECIMAL(65,30) NOT NULL,
    "isOccupied" BOOLEAN NOT NULL DEFAULT false,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "archivedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT,
    "archivedById" TEXT,

    CONSTRAINT "houses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "houses" ADD CONSTRAINT "houses_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "houses" ADD CONSTRAINT "houses_archivedById_fkey" FOREIGN KEY ("archivedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
