-- CreateEnum
CREATE TYPE "IconTag" AS ENUM ('HOME', 'USER', 'SETTINGS', 'STAR', 'SHOPPING_CART', 'HEART', 'TAG');

-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('PAID', 'REFUNDED');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "addresses" (
    "placeId" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "county" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "latitude" DECIMAL(65,30),
    "longitude" DECIMAL(65,30),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("placeId")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isMonthly" BOOLEAN NOT NULL DEFAULT false,
    "isExclusiveToOwner" BOOLEAN NOT NULL DEFAULT false,
    "limitOnePerUser" BOOLEAN NOT NULL DEFAULT false,
    "requiresCode" BOOLEAN NOT NULL DEFAULT false,
    "hasLeaflet" BOOLEAN NOT NULL DEFAULT false,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "archivedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT,
    "archivedById" TEXT,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "codes" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "inactiveAt" TIMESTAMP(3),
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "archivedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "subscriptionId" INTEGER NOT NULL,
    "createdById" TEXT,
    "archivedById" TEXT,

    CONSTRAINT "codes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "configurations" (
    "id" SERIAL NOT NULL,
    "color" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" "IconTag" NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "createdById" TEXT,
    "archivedById" TEXT,

    CONSTRAINT "configurations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documents" (
    "id" SERIAL NOT NULL,
    "documentId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "archivedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT,
    "archivedById" TEXT,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice" (
    "id" SERIAL NOT NULL,
    "stripeInvoiceId" TEXT NOT NULL,
    "stripePaymentIntentId" TEXT NOT NULL,
    "status" "InvoiceStatus" NOT NULL DEFAULT 'PAID',
    "total" DECIMAL(65,30) NOT NULL,
    "currency" TEXT NOT NULL,
    "hostedInvoiceUrl" TEXT NOT NULL,
    "invoicePdfUrl" TEXT NOT NULL,
    "issuedAt" TIMESTAMP(3) NOT NULL,
    "orderId" INTEGER NOT NULL,

    CONSTRAINT "invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locations" (
    "id" SERIAL NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "archivedAt" TIMESTAMP(3),
    "subscriptionId" INTEGER NOT NULL,
    "createdById" TEXT,
    "archivedById" TEXT,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order" (
    "id" SERIAL NOT NULL,
    "soldAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),
    "userId" TEXT,
    "subscriptionId" INTEGER NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriptions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(65,30) NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "archivedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "createdById" TEXT,
    "archivedById" TEXT,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "imageUrl" TEXT,
    "phoneNumber" TEXT,
    "addressAttempts" INTEGER NOT NULL DEFAULT 0,
    "addressBlockedUntil" TIMESTAMP(3),
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "addressId" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SubscriptionDocuments" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_SubscriptionDocuments_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "codes_code_key" ON "codes"("code");

-- CreateIndex
CREATE UNIQUE INDEX "configurations_categoryId_key" ON "configurations"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "documents_documentId_key" ON "documents"("documentId");

-- CreateIndex
CREATE UNIQUE INDEX "invoice_stripeInvoiceId_key" ON "invoice"("stripeInvoiceId");

-- CreateIndex
CREATE UNIQUE INDEX "invoice_stripePaymentIntentId_key" ON "invoice"("stripePaymentIntentId");

-- CreateIndex
CREATE UNIQUE INDEX "invoice_orderId_key" ON "invoice"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "locations_subscriptionId_key" ON "locations"("subscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "subscriptions_name_key" ON "subscriptions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "_SubscriptionDocuments_B_index" ON "_SubscriptionDocuments"("B");

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_archivedById_fkey" FOREIGN KEY ("archivedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "codes" ADD CONSTRAINT "codes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "codes" ADD CONSTRAINT "codes_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "subscriptions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "codes" ADD CONSTRAINT "codes_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "codes" ADD CONSTRAINT "codes_archivedById_fkey" FOREIGN KEY ("archivedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "configurations" ADD CONSTRAINT "configurations_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "configurations" ADD CONSTRAINT "configurations_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "configurations" ADD CONSTRAINT "configurations_archivedById_fkey" FOREIGN KEY ("archivedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_archivedById_fkey" FOREIGN KEY ("archivedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "subscriptions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_archivedById_fkey" FOREIGN KEY ("archivedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "subscriptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_archivedById_fkey" FOREIGN KEY ("archivedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "addresses"("placeId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubscriptionDocuments" ADD CONSTRAINT "_SubscriptionDocuments_A_fkey" FOREIGN KEY ("A") REFERENCES "documents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubscriptionDocuments" ADD CONSTRAINT "_SubscriptionDocuments_B_fkey" FOREIGN KEY ("B") REFERENCES "subscriptions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
