import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { share } from 'rxjs/operators';
import { RegisterUserDto } from '../models/dto/register-user.dto';
import { User } from '../models/user.model';
import { URLS } from '../common/constants/urls.constant';

@Injectable({
	providedIn: 'root'
})
export class RegisterService {
	public registeredUser!: User;

	constructor(private http: HttpClient) { }

	register(user: RegisterUserDto) {
		let obs = this.http.post(URLS.REGISTER_USER, user).pipe(share())
		obs.subscribe((userResponse) => {
      console.log(userResponse);
		})
		return obs;
	}
}
