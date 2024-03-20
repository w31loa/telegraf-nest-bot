/*
  Warnings:

  - You are about to drop the column `sunjectId` on the `Mark` table. All the data in the column will be lost.
  - Added the required column `subjectId` to the `Mark` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Mark" DROP CONSTRAINT "Mark_sunjectId_fkey";

-- AlterTable
ALTER TABLE "Mark" DROP COLUMN "sunjectId",
ADD COLUMN     "subjectId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Mark" ADD CONSTRAINT "Mark_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
