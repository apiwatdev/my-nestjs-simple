import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Book } from 'src/database/schemas/book.schema';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get(':bookId')
  async getBook(@Param('id') bookId: string): Promise<Book> {
    return this.booksService.getBookById(bookId);
  }

  @Get()
  async getBooks(): Promise<Book[]> {
    return this.booksService.getBooks();
  }

  @Post()
  async createBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.createBook(
      createBookDto.title,
      createBookDto.totalPage,
      createBookDto.edition,
    );
  }

  @Patch(':bookId')
  async updateBook(
    @Param('bookId') bookId: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    return this.booksService.updateBook(bookId, updateBookDto);
  }
}
