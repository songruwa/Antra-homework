import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });;
  loginMsg: string = '';


  constructor(private fb: FormBuilder, private readonly authService: AuthService) { }

  ngOnInit(): void {}

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }
  onSubmit() {
    this.authService.login({ email: this.email?.value, password: this.password?.value })
      .subscribe({
        next: () => {},
        error: (error) => {
          console.log(error);
          this.loginMsg = 'Wrong email or password'
        }
      });
  }
}
