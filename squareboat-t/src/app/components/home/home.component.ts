import { Component, OnInit } from '@angular/core';
import { Tweet } from 'src/app/models/tweet.model';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';
import { TweetsService } from 'src/app/services/tweets.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public tweets: Tweet[] = [];
  public authenticatedUser: User | undefined;
  
  public constructor(private loginService: LoginService, private tweetService: TweetsService) {
  }
  ngOnInit(): void {
    this.loginService.getAuthenticatedUser().subscribe(user => {
      this.authenticatedUser = user;
      this.getTweets();
    });
    this.getTweets();
  }

  public getTweets() {
    if(this.authenticatedUser) {
      this.tweetService.getFeed(this.authenticatedUser.userId)
        .then(tweets => {
          this.tweets = tweets;
        }).catch(err => {
          console.error(err);
          alert(err);
        });
    }
  }

}
