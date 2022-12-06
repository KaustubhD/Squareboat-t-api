import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { URLS } from '../common/constants/urls.constant';
import { LoginDto } from '../models/dto/login.dto';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private authenticatedUser: Subject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);
  public getAuthenticatedUser(){
    return this.authenticatedUser;
  }
  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private readonly KEY: string = "authUser"

  constructor(private http: HttpClient) {
	  const userInStorage = localStorage.getItem(this.KEY);
	  if(userInStorage != null) {
		  this.setAuthenticatedUser(JSON.parse(userInStorage) as User)
	  }
  }
  

  authenticate(user: LoginDto) {
    return this.http.post<User>(URLS.LOGIN_USER, user);
  }
  
  saveAuthenticatedUser(user: User) {
	  this.setAuthenticatedUser(user)
	  localStorage.setItem(this.KEY, JSON.stringify(user))
  }

  setAuthenticatedUser(user: User): void {
	  this.loggedIn.next(true);
	  this.authenticatedUser.next(user);
  }

  logoutUser() {
    this.loggedIn.next(false);
    this.authenticatedUser.next(undefined);
	  localStorage.removeItem(this.KEY);
  }
}
