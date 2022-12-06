import { User } from "./user.model";

export class Tweet {
  public tweetId!: string;

  public authorId!: string;

  public author?: User;
  
  public createdAt!: string;

  public content!: string;
}