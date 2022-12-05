import { Module } from '@nestjs/common';
import { TweetService } from './tweets.service';
import { TweetController } from './tweets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Tweet } from './entities/tweet.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Tweet]),
    UsersModule,
  ],
  controllers: [TweetController],
  providers: [TweetService]
})
export class TweetModule {}
