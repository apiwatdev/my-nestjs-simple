import { bookStub } from '../../books/test/stubs/book.stub';

export const BooksService = jest.fn().mockReturnValue({
  findOne: jest.fn().mockResolvedValue(bookStub()),
  getBooks: jest.fn().mockResolvedValue([bookStub()]),
  createBook: jest.fn().mockResolvedValue(bookStub()),
  updateBook: jest.fn().mockResolvedValue(bookStub()),
});
