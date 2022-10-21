import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Book } from '../../database/schemas/book.schema';
import { BooksRepository } from '../../database/books.repository';
import { BooksService } from '../books.service';
import { BookModel } from './support/book.model';
import { bookStub } from './stubs/book.stub';

describe('BooksService', () => {
  let service: BooksService;
  let repo: BooksRepository;
  let bookModel: BookModel;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        BooksRepository,
        {
          provide: getModelToken(Book.name),
          useClass: BookModel,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    repo = module.get<BooksRepository>(BooksRepository);
    bookModel = module.get<BookModel>(getModelToken(Book.name));

    jest.clearAllMocks();
  });

  describe('getBooks', () => {
    let books: Book[];

    beforeEach(async () => {
      jest.spyOn(bookModel, 'find');
      books = await service.getBooks();
    });
    it('test', () => {
      console.log(books);
    });
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
