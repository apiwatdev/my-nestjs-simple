import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from './schemas/book.schema';
import { EntityRepository } from '../database/entity.repository';

export class BooksRepository extends EntityRepository<BookDocument> {
  constructor(@InjectModel(Book.name) bookModel: Model<BookDocument>) {
    super(bookModel);
  }
}
