import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { TweetsService } from 'src/app/services/tweets.service';
import { CreateTweetDto } from './dto/create-tweet.dto';

@Component({
  selector: 'app-tweet-create',
  templateUrl: './tweet-create.component.html',
  styleUrls: ['./tweet-create.component.css']
})
export class TweetCreateComponent {

  public constructor(private tweetService: TweetsService) {}
  @Input('user') authenticatedUser!: User;
  public content = '';
  public displaySuccessTweet = false;

  postTweet() {
    if (this.authenticatedUser) {
      const dto: CreateTweetDto = { userId: this.authenticatedUser.userId, content: this.content };
      this.tweetService.postTweet(dto)
        .then(() => {
          this.clearFields();
          this.displaySuccessTweet = true;
          setTimeout(() => {
            this.displaySuccessTweet = false;
          }, 500);
        }).catch((err) => {
          console.error(err);
          alert('Tweet failed to post. Please try again.')
        })
    }
  }

  clearFields() {
    this.content = '';
  }
}
