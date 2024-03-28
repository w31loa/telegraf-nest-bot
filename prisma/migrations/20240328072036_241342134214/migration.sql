-- DropForeignKey
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_userId_fkey";

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
