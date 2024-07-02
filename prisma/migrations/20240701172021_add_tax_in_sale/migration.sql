/*
  Warnings:

  - Made the column `subtotal` on table `Sale` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Sale" ADD COLUMN     "tax" DOUBLE PRECISION,
ALTER COLUMN "subtotal" SET NOT NULL;
