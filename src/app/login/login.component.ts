import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {
    sessionStorage.clear();
  }
  result: any;

  loginform = this.builder.group({
    userName: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
  });

  proceedlogin() {
    if (this.loginform.valid) {
      this.authService.LoginUser(this.loginform.value).subscribe((item) => {
        console.log(item);
        const user: any = item.find((a: any) => {
          return (
            a.userName === this.loginform.value.userName &&
            a.password === this.loginform.value.password
          );
        });

        console.log('user.name', user.status);
        // if (this.result.name) {
        // }
        // if (this.result.password === this.loginform.value.password) {
        if (user.status) {
          sessionStorage.setItem('dataUser', JSON.stringify(user));
          sessionStorage.setItem('username', user.userName);
          sessionStorage.setItem('role', user.role);
          this.router.navigate(['']);
          this.router.navigate(['']);
        } else {
          this.toastr.error('Please contact Admin', 'InActive User');
        }
        // } else {
        //   this.toastr.error('Invalid credentials');
        // }
      });
    } else {
      this.toastr.warning('Please enter valid data.');
    }
  }
}
