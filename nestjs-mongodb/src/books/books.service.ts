import { Injectable } from '@nestjs/common';
import { BooksRepository } from '../database/books.repository';
import { Book } from '../database/schemas/book.schema';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private readonly bookRepository: BooksRepository) {}

  async getBooks(): Promise<Book[]> {
    const book1 = await this.bookRepository.find({});
    const book2 = await this.bookRepository.find({});
    return [...book1, ...book2];
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
