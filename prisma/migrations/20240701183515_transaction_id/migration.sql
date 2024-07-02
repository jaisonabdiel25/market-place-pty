/*
  Warnings:

  - Made the column `tax` on table `Sale` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Sale" ADD COLUMN     "transactionId" TEXT,
ALTER COLUMN "tax" SET NOT NULL;
