-- CreateTable
CREATE TABLE `KeyStore` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `client` INTEGER NOT NULL,
    `primaryKey` VARCHAR(255) NULL,
    `secondaryKey` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
