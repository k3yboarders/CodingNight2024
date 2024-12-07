import { DbService } from './../db/db.service';
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { ArticleDto } from './dto/article.dto';
import { getArticleSuggestedTagsPrompt } from './article.constant';
import { GeminiService } from 'src/gemini/gemini.service';

@Injectable()
export class ArticleService {
  constructor(private readonly prisma: DbService, private readonly gemini: GeminiService) {}

  async getArticleCategories() {
    return await this.prisma.articleCategory.findMany({
      include: { articles: true },
    });
  }

  async addArticle(data: ArticleDto, userId: string) {
    return await this.prisma.article.create({
      data: {
        title: data.title,
        content: data.content,
        category: { connect: { id: data.categoryId } },
        tags: data.tags,
        author: { connect: { id: userId } },
      },
    });
  }

  async getArticles(categoryId?: string) {
    const whereParams = categoryId ? { categoryId } : {};
    const articles = await this.prisma.article.findMany({
      where: whereParams,
      include: { author: true, bookmarkedArticles: true },
    });
    return articles.map((article) => ({
      ...article,
      isBookmarked: article.bookmarkedArticles.length > 0,
      bookmarkedArticles: undefined,
    }));
  }

  async suggestTags(data: ArticleDto, userId: string) {
    return await this.gemini.generateTextWithData(getArticleSuggestedTagsPrompt([]), data);
  }

  async updateArticle(articleId: string, data: ArticleDto, userId: string) {
    const article = await this.prisma.article.findUnique({
      where: { id: articleId, authorId: userId },
    });
    if (!article) {
      throw new HttpException('Article not found', 404);
    }

    return await this.prisma.article.update({
      where: { id: articleId },
      data: {
        title: data.title,
        content: data.content,
        category: { connect: { id: data.categoryId } },
        tags: data.tags,
      },
    });
  }

  async deleteArticle(articleId: string, userId: string) {
    const article = await this.prisma.article.findUnique({
      where: { id: articleId, authorId: userId },
    });
    if (!article) {
      throw new HttpException('Article not found', 404);
    }

    return await this.prisma.article.delete({ where: { id: articleId } });
  }

  async getArticleById(articleId: string) {
    return await this.prisma.article.findUnique({
      where: { id: articleId },
      include: { author: true },
    });
  }

  async bookmarkArticle(articleId: string, userId: string) {
    const bookmark = await this.prisma.bookmarkedArticle.findUnique({
      where: { userId_articleId: { articleId, userId } },
    });
    if (bookmark) {
      return await this.prisma.bookmarkedArticle.delete({
        where: { userId_articleId: { articleId, userId } },
      });
    }

    return await this.prisma.bookmarkedArticle.create({
      data: {
        articleId,
        userId,
      },
    });
  }
}
