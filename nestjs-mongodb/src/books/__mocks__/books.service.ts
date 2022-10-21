import { bookStub } from '../test/stubs/book.stub';

export const BooksService = jest.fn().mockReturnValue({
  getBookById: jest.fn().mockResolvedValue(bookStub()),
  getBooks: jest.fn().mockResolvedValue([bookStub()]),
  createBook: jest.fn().mockResolvedValue(bookStub()),
  updateBook: jest.fn().mockResolvedValue(bookStub()),
});
