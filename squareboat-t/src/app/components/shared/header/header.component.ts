import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  logged: boolean = false;
  constructor(private service: LoginService, private router: Router) {
    this.service.loggedIn.subscribe(isLogged => {
      this.logged = isLogged;
    });
  }

  logout() {
    this.service.logoutUser();
    this.router.navigate(['/login']);
  }

}
