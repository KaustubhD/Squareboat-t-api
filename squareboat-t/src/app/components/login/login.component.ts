import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { LoginDto } from 'src/app/models/dto/login.dto';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  cred = new LoginDto();
  alert: boolean = false;
  success: boolean = false;
  constructor(private router: Router, private service: LoginService) { }

  ngOnInit(): void {

  }
  authenticate() {
    this.service.authenticate(this.cred).subscribe({
      next: data => {
        this.success = true;
        this.onSuccess(data);
      },
      error: error => {
        let errorMessage = error.message;
        console.error(errorMessage);
        this.alert = true;
      }
    });
  }

  onSuccess(user: User) {
    
    this.service.saveAuthenticatedUser(user);
    setTimeout(() => { this.router.navigate(['home']) }, 700);

  }
}