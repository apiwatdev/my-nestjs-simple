import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseService } from './database.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        if (config.get<string>('NODE_ENV') === 'test') {
          return {
            uri: config.get<string>('MONGO_TEST_CONNECTION_URI'),
          };
        }
        const MONGODB_URL = config.get<string>('MONGODB_URL');
        const MONGODB_USER = config.get<string>('MONGODB_USER');
        const MONGODB_PASSWORD = config.get<string>('MONGODB_PASSWORD');
        const uri = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}`;

        return {
          uri: uri,
        };
      },
    }),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
