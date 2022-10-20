import { Injectable } from '@nestjs/common';
import { BooksRepository } from 'src/database/books.repository';
import { Book } from 'src/database/schemas/book.schema';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private readonly bookRepository: BooksRepository) {}

  async getBooks(): Promise<Book[]> {
    return this.bookRepository.find({});
  }

  async getBookById(bookId: string): Promise<Book> {
    return this.bookRepository.findOne({ _id: bookId });
  }

  async createBook(
    title: string,
    totalPage: number,
    edition: number,
  ): Promise<Book> {
    return this.bookRepository.create({
      title: title,
      totalPage: totalPage,
      edition: edition,
    });
  }

  async updateBook(
    bookId: string,
    updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    return this.bookRepository.findOneAndUpdate({ _id: bookId }, updateBookDto);
  }
}
