/*
  Warnings:

  - You are about to drop the `MessageUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `receiverId` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MessageUser" DROP CONSTRAINT "MessageUser_messageId_fkey";

-- DropForeignKey
ALTER TABLE "MessageUser" DROP CONSTRAINT "MessageUser_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "MessageUser" DROP CONSTRAINT "MessageUser_senderId_fkey";

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "receiverId" TEXT NOT NULL,
ADD COLUMN     "senderId" TEXT NOT NULL;

-- DropTable
DROP TABLE "MessageUser";

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
