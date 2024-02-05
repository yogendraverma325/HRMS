/*
  Warnings:

  - You are about to drop the column `client` on the `KeyStore` table. All the data in the column will be lost.
  - Made the column `primaryKey` on table `KeyStore` required. This step will fail if there are existing NULL values in that column.
  - Made the column `secondaryKey` on table `KeyStore` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `KeyStore` DROP COLUMN `client`,
    ADD COLUMN `key` INTEGER NOT NULL DEFAULT 0,
    MODIFY `primaryKey` VARCHAR(255) NOT NULL,
    MODIFY `secondaryKey` VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE `Key` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `keys` VARCHAR(255) NOT NULL,
    `version` VARCHAR(255) NOT NULL,
    `status` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
