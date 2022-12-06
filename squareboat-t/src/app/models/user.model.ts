export class User {
  public displayName!: string;
  public userName!: string;
  public email!: string;
  public userId!: string;
  public followers: User[] = [];
  public following: User[] = [];
}