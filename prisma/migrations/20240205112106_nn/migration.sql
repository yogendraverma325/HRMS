/*
  Warnings:

  - You are about to alter the column `status` on the `Key` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `Key` MODIFY `status` BOOLEAN NOT NULL;
