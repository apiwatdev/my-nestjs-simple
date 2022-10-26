import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { BooksModule } from '../src/books/books.module';
import { UserModel } from './users/test/support/user.model';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env${
        process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''
      }`,
    }),
    DatabaseModule,
    BooksModule,
    UserModel,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
