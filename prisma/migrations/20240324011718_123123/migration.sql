-- DropForeignKey
ALTER TABLE "Mark" DROP CONSTRAINT "Mark_subjectId_fkey";

-- AddForeignKey
ALTER TABLE "Mark" ADD CONSTRAINT "Mark_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
