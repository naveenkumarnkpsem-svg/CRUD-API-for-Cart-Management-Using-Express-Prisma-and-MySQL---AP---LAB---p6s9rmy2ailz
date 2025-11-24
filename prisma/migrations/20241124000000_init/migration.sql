-- CreateTable
CREATE TABLE `cart` (
    `cartId` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,
    `count` INTEGER NOT NULL,

    PRIMARY KEY (`cartId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
