import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, share } from 'rxjs';
import { URLS } from '../common/constants/urls.constant';
import { User } from '../models/user.model';
import { RegisterUserDto } from '../models/dto/register-user.dto';
import { FollowDto } from '../components/users-list/dto/follow.dto';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) {

  }

  register(user: RegisterUserDto) {
		let obs = this.http.post(URLS.REGISTER_USER, user).pipe(share())
		obs.subscribe((userResponse) => {
      console.log(userResponse);
		})
		return obs;
	}
  
  getAllUsers(): Promise<User[]> {
    return firstValueFrom(this.http.get<User[]>(URLS.GET_ALL_USERS));
  }

  followUser(followDto: FollowDto) {
    return firstValueFrom(this.http.post(URLS.FOLLOW_USER, followDto));
  }

  unfollowUser(followDto: FollowDto) {
    return firstValueFrom(this.http.post(URLS.UNFOLLOW_USER, followDto));
  }
}
