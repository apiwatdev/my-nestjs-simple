import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { Connection } from 'mongoose';
import { AppModule } from '../../app.module';
import { DatabaseService } from '../../database/database.service';
import { bookStub } from './stubs/book.stub';
import { CreateBookDto } from '../dto/create-book.dto';

describe('BookController', () => {
  let dbConnection: Connection;
  let httpServer: any;
  let app: any;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    dbConnection = moduleRef
      .get<DatabaseService>(DatabaseService)
      .getDBHandler();

    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await dbConnection.collection('books').deleteMany({});
  });
  describe('getBooks', () => {
    it('should return an array of users', async () => {
      await dbConnection.collection('books').insertOne(bookStub());
      const response = await request(httpServer).get('/books');
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject([bookStub()]);
    });
  });

  describe('createBook', () => {
    it('should return an array of users', async () => {
      const createBookRequest: CreateBookDto = {
        title: bookStub().title,
        edition: bookStub().edition,
        totalPage: bookStub().totalPage,
      };

      const response = await request(httpServer)
        .post('/books')
        .send(createBookRequest);
      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(createBookRequest);

      const book = await dbConnection
        .collection('books')
        .findOne({ title: createBookRequest.title });

      expect(book).toMatchObject(createBookRequest);
    });
  });
});
