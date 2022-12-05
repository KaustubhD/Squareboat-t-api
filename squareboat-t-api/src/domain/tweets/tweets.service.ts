import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { Tweet } from './entities/tweet.entity';

@Injectable()
export class TweetService {

  public constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Tweet) private tweetRepository: Repository<Tweet>,
  ) {}

  async create(createTweetDto: CreateTweetDto) {
    const user = await this.userRepository.findOneBy({ userId: createTweetDto.userId });
    const newTweet = this.tweetRepository.create({ content: createTweetDto.content, author: user });

    return this.tweetRepository.save(newTweet);
  }

  findAll() {
    return this.tweetRepository.find();
  }

  feed(userId: string) {
    return this.tweetRepository.createQueryBuilder('tweet')
    .innerJoinAndSelect('tweet.author', 'author')
    .innerJoin('author.followers', 'followers')
    .where('followers.userId = :userId', { userId })
    .getMany();
    /*

      Get all tweets by the user's following list

      select * from post p
        inner join follower-to-folowee fof
        on p.authorId = fof.userId1   // userId2 follows userId1
        where fof.userId2 = userId;

    */
  }
  findOne(id: number) {
    return `This action returns a #${id} tweet`;
  }

  update(id: number, updateTweetDto: UpdateTweetDto) {
    return `This action updates a #${id} tweet`;
  }

  remove(id: number) {
    return `This action removes a #${id} tweet`;
  }
}
