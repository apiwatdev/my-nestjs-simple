import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from 'src/database/schemas/book.schema';
import { EntityRepository } from './entity.repository';

export class BooksRepository extends EntityRepository<BookDocument> {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {
    super(bookModel);
  }
}
