/*
  Warnings:

  - The values [HOME,USER,SETTINGS,STAR,SHOPPING_CART,HEART,TAG] on the enum `IconTag` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "IconTag_new" AS ENUM ('HOUSE', 'PAW_PRINT', 'UNIVERSITY', 'BRIEFCASE_BUSINESS', 'HANDSHAKE', 'BEER', 'WINE', 'STORE', 'SHOPPING_BASKET', 'CASTLE', 'TENT', 'SCALE', 'TENT_TREE', 'FLAME_KINDLING', 'USERS', 'TRAIN_TRACK', 'SHIP', 'SCISSORS', 'COAT_HANGER', 'CROISSANT', 'FACTORY', 'TREES', 'TREE_PINE', 'FISH', 'BINOCULARS', 'STETHOSCOPE', 'HOSPITAL', 'BRIEFCASE_MEDICAL', 'ID_CARD_LANYARD', 'SCROLL_TEXT', 'LANDMARK', 'UTENSILS_CROSSED', 'CCTV', 'CHURCH', 'HAMMER', 'PICKAXE', 'SWORDS');
ALTER TABLE "configurations" ALTER COLUMN "icon" TYPE "IconTag_new" USING ("icon"::text::"IconTag_new");
ALTER TYPE "IconTag" RENAME TO "IconTag_old";
ALTER TYPE "IconTag_new" RENAME TO "IconTag";
DROP TYPE "IconTag_old";
COMMIT;
