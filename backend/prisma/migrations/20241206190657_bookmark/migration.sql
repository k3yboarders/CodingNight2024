/*
  Warnings:

  - A unique constraint covering the columns `[userId,articleId]` on the table `BookmarkedArticle` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BookmarkedArticle_userId_articleId_key" ON "BookmarkedArticle"("userId", "articleId");
