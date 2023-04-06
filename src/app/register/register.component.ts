import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../Service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  registerform = this.builder.group({
    userName: this.builder.control(
      '',
      Validators.compose([Validators.required, Validators.minLength(5)])
    ),
    fullName: this.builder.control('', Validators.required),
    password: this.builder.control(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        ),
      ])
    ),
    email: this.builder.control(
      '',
      Validators.compose([Validators.required, Validators.email])
    ),
    role: this.builder.control(3),
    status: this.builder.control(false),
  });
  proceedregister() {
    if (this.registerform.valid) {
      this.authService
        .RegisterUser(this.registerform.value)
        .subscribe((result) => {
          this.toastr.success(
            'Please contact admin for enable access.',
            'Registered successfully'
          );
          this.router.navigate(['login']);
        });
    } else {
      this.toastr.warning('Please enter valid data.');
    }
  }
}
