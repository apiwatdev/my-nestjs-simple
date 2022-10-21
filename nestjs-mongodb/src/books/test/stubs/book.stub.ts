import { Book } from 'src/database/schemas/book.schema';

export const bookStub = (): Book => {
  return {
    title: 'Title name',
    totalPage: 200,
    edition: 2,
  };
};
