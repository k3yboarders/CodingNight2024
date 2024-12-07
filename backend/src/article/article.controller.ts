import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ArticleService } from './article.service';
import { ArticleDto } from './dto/article.dto';
import { GetUser } from 'src/auth/decorator/getUser.decorator';
import { JwtAuthDto } from 'src/auth/dto/jwt-auth.dto';
import { PsychologistGuard } from 'src/auth/guards/psychologist.guard';
import { GeminiService } from 'src/gemini/gemini.service';

@UseGuards(AuthGuard('jwt'))
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async getArticles(@Query('categoryId') categoryId: string) {
    return this.articleService.getArticles(categoryId);
  }

  @Get('categories')
  async getArticleCategories() {
    return this.articleService.getArticleCategories();
  }

  @Get(':id')
  async getArticle(@Param('id') id: string) {
    return this.articleService.getArticleById(id);
  }

  @UseGuards(PsychologistGuard)
  @Post('suggested-tag')
  async suggestTags(@Body() data: ArticleDto, @GetUser() user: JwtAuthDto) {
    return this.articleService.suggestTags(data, user.userId);
  }

  @UseGuards(PsychologistGuard)
  @Post()
  async addArticle(@Body() data: ArticleDto, @GetUser() user: JwtAuthDto) {
    return this.articleService.addArticle(data, user.userId);
  }

  @UseGuards(PsychologistGuard)
  @Put(':id')
  async updateArticle(
    @Body() data: ArticleDto,
    @GetUser() user: JwtAuthDto,
    @Param('id') id: string,
  ) {
    return this.articleService.updateArticle(id, data, user.userId);
  }
  @UseGuards(PsychologistGuard)
  @Delete(':id')
  async deleteArticle(@GetUser() user: JwtAuthDto, @Param('id') id: string) {
    return this.articleService.deleteArticle(id, user.userId);
  }

  @Post('bookmark/:id')
  async bookmarkArticle(@GetUser() user: JwtAuthDto, @Param('id') id: string) {
    return this.articleService.bookmarkArticle(id, user.userId);
  }
}
