import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Book } from '../../database/schemas/book.schema';
import { BooksRepository } from '../../database/books.repository';
import { BooksService } from '../books.service';
import { BookModel } from './support/book.model';
import { bookStub } from './stubs/book.stub';
import { FilterQuery } from 'mongoose';
describe('BooksService', () => {
  describe('find operations', () => {
    let service: BooksService;
    let booksRepository: BooksRepository;
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
      booksRepository = module.get<BooksRepository>(BooksRepository);
      bookModel = module.get<BookModel>(getModelToken(Book.name));

      jest.clearAllMocks();
    });

    describe('getBooks', () => {
      describe('when getBooks function is called', () => {
        let books: Book[];

        beforeEach(async () => {
          jest.spyOn(bookModel, 'find');
          jest.spyOn(booksRepository, 'find');
          books = await service.getBooks();
        });

        test('then it should call the booksRepository', () => {
          expect(booksRepository.find).toHaveBeenCalledWith({});
        });

        test('then it should call the bookModel', () => {
          expect(bookModel.find).toHaveBeenCalledWith({});
        });
        it('then it should return a array of users', () => {
          expect(books).toEqual([bookStub()]);
        });
      });
    });

    describe('getBookById', () => {
      describe('when getBookById is called', () => {
        let book: Book;
        let bookId: string;
        let bookFilterQuery: FilterQuery<Book>;

        beforeEach(async () => {
          jest.spyOn(bookModel, 'findOne');
          jest.spyOn(booksRepository, 'findOne');
          bookId = '1234';
          book = await service.getBookById(bookId);
          bookFilterQuery = {
            _id: bookId,
          };
        });

        test('then it should call the booksRepository', () => {
          expect(booksRepository.findOne).toHaveBeenCalledWith(bookFilterQuery);
        });

        test('then it should call the bookModel', () => {
          expect(bookModel.findOne).toHaveBeenCalledWith(bookFilterQuery, {
            _id: 0,
            __v: 0,
          });
        });

        test('then it should return a book', () => {
          expect(book).toEqual(bookStub());
        });
      });
    });
  });

  describe('create operations', () => {
    let booksRepository: BooksRepository;
    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          BooksRepository,
          {
            provide: getModelToken(Book.name),
            useValue: BookModel,
          },
        ],
      }).compile();

      booksRepository = moduleRef.get<BooksRepository>(BooksRepository);
    });

    describe('createBook', () => {
      describe('when createBook is called', () => {
        let book: Book;
        let saveSpy: jest.SpyInstance;
        let constructorSpy: jest.SpyInstance;

        beforeEach(async () => {
          saveSpy = jest.spyOn(BookModel.prototype, 'save');
          constructorSpy = jest.spyOn(BookModel.prototype, 'constructorSpy');
          book = await booksRepository.create(bookStub());
        });

        it('then it should call the bookRepository', () => {
          expect(saveSpy).toHaveBeenCalled();
          expect(constructorSpy).toHaveBeenCalledWith(bookStub());
        });

        it.todo('then it should call the bookModel');

        it.todo('then it should return a book');
      });
    });
  });

  // let usersRepository: BooksRepository;
  // describe('create operations', () => {
  //   beforeEach(async () => {
  //     const moduleRef = await Test.createTestingModule({
  //       providers: [
  //         BooksRepository,
  //         {
  //           provide: getModelToken(Book.name),
  //           useValue: BookModel,
  //         },
  //       ],
  //     }).compile();

  //     usersRepository = moduleRef.get<BooksRepository>(BooksRepository);
  //   });

  //   describe('create', () => {
  //     describe('when create is called', () => {
  //       let user: Book;
  //       let saveSpy: jest.SpyInstance;
  //       let constructorSpy: jest.SpyInstance;

  //       beforeEach(async () => {
  //         saveSpy = jest.spyOn(BookModel.prototype, 'save');
  //         constructorSpy = jest.spyOn(BookModel.prototype, 'constructorSpy');
  //         user = await usersRepository.create(bookStub());
  //       });

  //       test('then it should call the userModel', () => {
  //         expect(saveSpy).toHaveBeenCalled();
  //         expect(constructorSpy).toHaveBeenCalledWith(bookStub());
  //       });

  //       test('then it should return a user', () => {
  //         expect(user).toEqual(bookStub());
  //       });
  //     });
  //   });
  // });
});
