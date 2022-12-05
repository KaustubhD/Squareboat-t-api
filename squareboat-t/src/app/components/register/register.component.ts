import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterUserDto } from 'src/app/models/dto/register-user.dto';
import { User } from 'src/app/models/user.model';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userDto: RegisterUserDto = new RegisterUserDto();
  flag: boolean = false;
  alert: boolean = false;
  success: boolean = false;
  constructor(private router: Router, private service: RegisterService) { }


  register() {
    if (this.userDto.password == this.userDto.confirmpwd) {
      this.flag = true;
      let res = this.service.register(this.userDto).subscribe({
        next: data => {
          // this.user = data as User;
          this.onSuccess();
        },
        error: error => {
          let errorMessage = error.message;
          console.error(errorMessage);
          this.alert = true;
        }
      });
    }
    else {
      this.alert = true;
    }
  }

  onSuccess() {
    this.success = true;
    setTimeout(() => {
      this.router.navigate(['/login'])
    }, 700);
  }
}
