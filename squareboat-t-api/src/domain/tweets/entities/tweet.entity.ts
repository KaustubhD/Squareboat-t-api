import { User } from "src/domain/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tweet {
  
  @PrimaryGeneratedColumn('uuid')
  public tweetId: string;

  @Column()
  authorId: string;

  @ManyToOne(() => User, user => user.tweets, { eager: false, nullable: false })
  @JoinColumn({ name: 'authorId', referencedColumnName: 'userId'})
  public author: User;
  
  @CreateDateColumn()
  public createdAt: string;


  @Column({
    nullable: false,
    length: 200,
  })
  public content: string;

}
