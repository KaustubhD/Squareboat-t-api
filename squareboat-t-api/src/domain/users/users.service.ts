import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SecurityUtils } from '../../utils/SecurityUtils';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FollowDto } from './dto/follow-user.dto';
import { User } from './entities/user.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UsersService {

  public constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}


  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = SecurityUtils.hashPassword(createUserDto.password);
    const newUser = this.userRepository.create({ ...createUserDto, password: hashedPassword });
    return this.userRepository.save(newUser);
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOne(
      {
        relations: {
          followers: true,
          following: true,
        },
        where: { userName: loginDto.userName },
      }
    );
    const hashedPassword = SecurityUtils.hashPassword(loginDto.password);

    if (user && user.password == hashedPassword) {
      return this.removeSensitiveInfo(user);
    }

    return new UnauthorizedException();
  }

  async findAll(): Promise<User[]> {
    return (await this.userRepository.find()).map(this.removeSensitiveInfo);
  }

  async findOne(userId: string): Promise<User> {
    return this.removeSensitiveInfo(await this.userRepository.findOne(
      {
        relations: {
          followers: true,
          following: true,
        },
        where: { userId },
      }
    ));
  }
  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const userRecord = await this.findOne(id);
    return this.userRepository.save({ ...userRecord, ...updateUserDto});
  }

  async setInactive(id: string) {
    const userRecord = await this.findOne(id);
    this.userRepository.save({ ...userRecord, isActive: false });
    return;
  }

  async followUser(followDto: FollowDto) {
    const follower = await this.findOne(followDto.followerId);
    const followee = await this.findOne(followDto.followeeId);

    if (Array.isArray(follower.following)) {
      follower.following.push(followee);
    } else {
      follower.following = [followee];
    }

    await this.userRepository.save(follower);

    return { message: "User followed" };
  }

  async unfollowUser(followDto: FollowDto) {
    const follower = await this.findOne(followDto.followerId);
    const followee = await this.findOne(followDto.followeeId);

    if (Array.isArray(follower.following)) {
      follower.following = follower.following.filter(user => user.userId != followee.userId);
    }

    await this.userRepository.save(follower);

    return { message: "User unfollowed" };
  }

  removeSensitiveInfo(user: User): User {
    if (user) {
      delete user['password'];
      delete user['isActive'];
    }
    if (user.followers) {
      user.followers = user.followers.map(follower => this.removeSensitiveInfo(follower));
    }
    if (user.following) {
      user.following = user.following.map(followee => this.removeSensitiveInfo(followee));
    }

    return user;
  }
}
