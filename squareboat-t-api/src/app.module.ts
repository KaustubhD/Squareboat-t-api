import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { sqliteDbConfig } from './config/db.config';
import { TweetModule } from './domain/tweets/tweets.module';
import { UsersModule } from './domain/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(sqliteDbConfig),
    UsersModule,
    TweetModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
