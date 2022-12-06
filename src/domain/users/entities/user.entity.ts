import { Tweet } from "src/domain/tweets/entities/tweet.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, RelationCount } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  public userId: string;

  @Column({
    length: 30,
    default: 'User'
  })
  public displayName: string;

  @Column({
    unique: true,
    length: 30,
  })
  public userName: string;

  @Column({
    unique: true,
  })
  public email: string;

  @Column({
    length: 256,
  })
  public password: string;

  @Column({
    default: true
  })
  public isActive: boolean;

  @ManyToMany(() => User, user => user.following)
  @JoinTable()
  followers: User[];

  @ManyToMany(() => User, user => user.followers)
  following: User[];

  @OneToMany(() => Tweet, tweet => tweet.author)
  tweets: Tweet[];
}
