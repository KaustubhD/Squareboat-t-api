import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';
import { UsersService } from 'src/app/services/users.service';
import { FollowDto } from './dto/follow.dto';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  public users: User[] = [];
  public authenticatedUser!: User;

  public constructor(private userService: UsersService, private loginService: LoginService) {}
  
  ngOnInit(): void {
    this.loginService.getAuthenticatedUser().subscribe(user => {
      if (user) {
        this.authenticatedUser = user;
        this.getAllUsers();
      }
      // this.getTweets();
    });
    // this.
    // this.userService.getAllUsers().then(users => {
    //   this.users = users.filter(user => user.userId != this.authenticatedUser.userId);
    // }).catch((err) => {
    //   console.error(err);
    // });
  }

  getAllUsers() {
    this.userService.getAllUsers().then(users => {
      this.users = users.filter(user => user.userId != this.authenticatedUser.userId);
    });
  }

  isAlreadyFollowed(userId: string): boolean {
    return this.authenticatedUser.following.some(user => user.userId == userId);
  }

  follow(userId: string) {
    const followDto: FollowDto = {
      followerId: this.authenticatedUser.userId,
      followeeId: userId,
    };

    this.userService.followUser(followDto)
      .then(_ => {
        const followedUser = this.users.find(user => user.userId == userId);
        if (followedUser) {
          this.authenticatedUser.following.push(followedUser);
          this.loginService.saveAuthenticatedUser(this.authenticatedUser);
        }
      }).catch(err => {
        console.error(err);
        alert(err);
      });
  }

  unfollow(userId: string) {
    const followDto: FollowDto = {
      followerId: this.authenticatedUser.userId,
      followeeId: userId,
    };

    this.userService.unfollowUser(followDto)
      .then(_ => {
        const unfollowedUser = this.users.find(user => user.userId == userId);
        if (unfollowedUser) {
          this.authenticatedUser.following = this.authenticatedUser.following.filter(user => user.userId != userId);
          this.loginService.saveAuthenticatedUser(this.authenticatedUser);
        }
      }).catch(err => {
        console.error(err);
        alert(err);
      });
  }

}
