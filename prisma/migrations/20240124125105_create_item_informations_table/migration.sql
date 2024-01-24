-- CreateTable
CREATE TABLE `item_informations` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `item_id` INTEGER UNSIGNED NOT NULL,
    `label` VARCHAR(255) NOT NULL,
    `info` VARCHAR(255) NOT NULL,

    INDEX `item_informations_item_id_idx`(`item_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
