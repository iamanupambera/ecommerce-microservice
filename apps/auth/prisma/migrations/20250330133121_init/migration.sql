/*
  Warnings:

  - You are about to alter the column `deletedAt` on the `Auth` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - Made the column `refreshToken` on table `AuthSession` required. This step will fail if there are existing NULL values in that column.
  - Made the column `accessToken` on table `AuthSession` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Auth` MODIFY `deletedAt` TIMESTAMP NULL;

-- AlterTable
ALTER TABLE `AuthSession` MODIFY `refreshToken` VARCHAR(191) NOT NULL,
    MODIFY `accessToken` VARCHAR(191) NOT NULL;
