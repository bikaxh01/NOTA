-- CreateEnum
CREATE TYPE "PricingType" AS ENUM ('one_time', 'recurring');

-- CreateEnum
CREATE TYPE "PricingPlanInterval" AS ENUM ('day', 'week', 'month', 'year');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('trialing', 'active', 'canceled', 'incomplete', 'incomplete_expired', 'past_due', 'unpaid');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "fullName" TEXT,
    "avatarUrl" TEXT,
    "billingAddress" JSONB,
    "paymentMethod" JSONB,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customers" (
    "id" TEXT NOT NULL,
    "stripeCustomerId" TEXT NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "metadata" JSONB,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prices" (
    "id" TEXT NOT NULL,
    "productId" TEXT,
    "active" BOOLEAN NOT NULL,
    "description" TEXT,
    "unitAmount" BIGINT NOT NULL,
    "currency" TEXT NOT NULL,
    "type" "PricingType" NOT NULL,
    "interval" "PricingPlanInterval" NOT NULL,
    "intervalCount" INTEGER NOT NULL,
    "trialPeriodDays" INTEGER,
    "metadata" JSONB,

    CONSTRAINT "prices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriptions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "SubscriptionStatus" NOT NULL,
    "metadata" JSONB,
    "priceId" TEXT,
    "quantity" INTEGER NOT NULL,
    "cancelAtPeriodEnd" BOOLEAN NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "currentPeriodStart" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "currentPeriodEnd" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),
    "cancelAt" TIMESTAMP(3),
    "canceledAt" TIMESTAMP(3),
    "trialStart" TIMESTAMP(3),
    "trialEnd" TIMESTAMP(3),

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_id_fkey" FOREIGN KEY ("id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prices" ADD CONSTRAINT "prices_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_priceId_fkey" FOREIGN KEY ("priceId") REFERENCES "prices"("id") ON DELETE SET NULL ON UPDATE CASCADE;
