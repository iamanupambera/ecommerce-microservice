-- CreateEnum
CREATE TYPE "reviewType" AS ENUM ('buyerReview', 'sellerReview');

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "gigId" TEXT NOT NULL,
    "reviewerId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "review" TEXT NOT NULL,
    "reviewerImage" TEXT NOT NULL,
    "reviewerUsername" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "reviewType" "reviewType" NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Review_gigId_idx" ON "Review"("gigId");

-- CreateIndex
CREATE INDEX "Review_sellerId_idx" ON "Review"("sellerId");
