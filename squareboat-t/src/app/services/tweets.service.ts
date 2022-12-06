import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { URLS } from '../common/constants/urls.constant';
import { Tweet } from '../models/tweet.model';
import { CreateTweetDto } from '../components/tweet-create/dto/create-tweet.dto';

@Injectable({
  providedIn: 'root'
})
export class TweetsService {
  constructor(private http: HttpClient) {

  }
  

  getFeed(userId: string): Promise<Tweet[]> {
    return firstValueFrom(this.http.get<Tweet[]>(URLS.USER_FEED(userId)));
  }
  postTweet(dto: CreateTweetDto) {
    return firstValueFrom(this.http.post<Tweet>(URLS.POST_TWEET, dto));
  }
}
