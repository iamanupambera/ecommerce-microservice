/*
  Warnings:

  - You are about to drop the column `emailVerificationToken` on the `Auth` table. All the data in the column will be lost.
  - You are about to drop the column `otp` on the `Auth` table. All the data in the column will be lost.
  - You are about to drop the column `otpExpiration` on the `Auth` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Auth` table. All the data in the column will be lost.
  - You are about to drop the column `passwordResetExpires` on the `Auth` table. All the data in the column will be lost.
  - You are about to drop the column `passwordResetToken` on the `Auth` table. All the data in the column will be lost.
  - You are about to alter the column `deletedAt` on the `Auth` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - Added the required column `updatedAt` to the `Auth` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Auth_emailVerificationToken_key` ON `Auth`;

-- AlterTable
ALTER TABLE `Auth` DROP COLUMN `emailVerificationToken`,
    DROP COLUMN `otp`,
    DROP COLUMN `otpExpiration`,
    DROP COLUMN `password`,
    DROP COLUMN `passwordResetExpires`,
    DROP COLUMN `passwordResetToken`,
    ADD COLUMN `lastActiveAt` DATETIME(3) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `deletedAt` TIMESTAMP NULL;

-- CreateTable
CREATE TABLE `AuthPassword` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hash` VARCHAR(191) NOT NULL,
    `authId` INTEGER NOT NULL,

    INDEX `AuthPassword_authId_idx`(`authId`),
    UNIQUE INDEX `AuthPassword_authId_key`(`authId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ResetPasswordRequest` (
    `authId` INTEGER NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `ResetPasswordRequest_authId_idx`(`authId`),
    UNIQUE INDEX `ResetPasswordRequest_authId_key`(`authId`),
    PRIMARY KEY (`authId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AuthSession` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `refreshToken` TEXT NULL,
    `accessToken` TEXT NULL,
    `authId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `AuthSession_authId_idx`(`authId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VerifiedEmail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `emailVerificationToken` VARCHAR(191) NULL,
    `authId` INTEGER NULL,

    INDEX `VerifiedEmail_authId_idx`(`authId`),
    UNIQUE INDEX `VerifiedEmail_authId_key`(`authId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AuthOTP` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `otp` VARCHAR(191) NULL,
    `expires` DATETIME(3) NOT NULL,
    `authId` INTEGER NULL,

    INDEX `AuthOTP_authId_idx`(`authId`),
    UNIQUE INDEX `AuthOTP_authId_key`(`authId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AuthPassword` ADD CONSTRAINT `AuthPassword_authId_fkey` FOREIGN KEY (`authId`) REFERENCES `Auth`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ResetPasswordRequest` ADD CONSTRAINT `ResetPasswordRequest_authId_fkey` FOREIGN KEY (`authId`) REFERENCES `Auth`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AuthSession` ADD CONSTRAINT `AuthSession_authId_fkey` FOREIGN KEY (`authId`) REFERENCES `Auth`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VerifiedEmail` ADD CONSTRAINT `VerifiedEmail_authId_fkey` FOREIGN KEY (`authId`) REFERENCES `Auth`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AuthOTP` ADD CONSTRAINT `AuthOTP_authId_fkey` FOREIGN KEY (`authId`) REFERENCES `Auth`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
