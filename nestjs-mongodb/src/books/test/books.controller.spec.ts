import { Test, TestingModule } from '@nestjs/testing';
import { Book } from 'src/database/schemas/book.schema';
import { BooksController } from '../books.controller';
import { BooksService } from '../books.service';
import { bookStub } from './stubs/book.stub';

jest.mock('../books.service.ts');

describe('BooksController', () => {
  let controller: BooksController;
  let booksService: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    booksService = module.get<BooksService>(BooksService);

    jest.clearAllMocks();
  });

  describe('getBook', () => {
    describe('when getBook is called', () => {
      let book: Book;
      const bookId = '1234';
      beforeEach(async () => {
        book = await controller.getBook(bookId);
      });

      it('then it should call booksService', () => {
        expect(booksService.getBookById).toBeCalledWith(bookId);
      });

      test('then is should return a user', () => {
        expect(book).toEqual(bookStub());
      });
    });
  });
});
