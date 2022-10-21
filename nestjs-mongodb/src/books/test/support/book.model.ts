import { Book } from '../../../database/schemas/book.schema';
import { MockModel } from '../../../database/test/support/mock.model';
import { bookStub } from '../stubs/book.stub';

export class BookModel extends MockModel<Book> {
  protected entityStub = bookStub();
}
