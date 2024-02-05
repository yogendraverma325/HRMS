/*
  Warnings:

  - You are about to drop the column `key` on the `KeyStore` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `KeyStore` DROP COLUMN `key`,
    ADD COLUMN `client` INTEGER NOT NULL DEFAULT 0;
