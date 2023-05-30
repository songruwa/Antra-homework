import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Observable, debounceTime, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})

export class RegisterPageComponent implements OnInit {
  step: number = 1;
  form!: FormGroup;

  public emailAlreadyExist = false;

  isLoading = false;
  selecedColumn: 'USER' | 'SUPERUSER' | 'ADMIN' = 'ADMIN';

  constructor(private fb: FormBuilder, private http: HttpClient, private readonly authservice: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {

      this.form = this.fb.group({
        email: [params['email'], [Validators.required, Validators.email], [this._emailExists.bind(this)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        username: ['', [Validators.required, Validators.minLength(4)]],
        tmdb_key: ['', [Validators.required, Validators.minLength(30)]]
      });
    })
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get username() {
    return this.form.get('username');
  }

  get tmdb_key() {
    return this.form.get('tmdb_key');
  }

  _emailExists = (control: AbstractControl): Observable<ValidationErrors | null> => {
    const val = control.value;
    const url = "http://localhost:4231/auth/check-email";
    this.emailAlreadyExist = false;

    return this.http.post(url, { email: val }).pipe(
      tap((_) => { this.isLoading = true }),
      debounceTime(500),
      map((data: any) => {
        console.log(data)
        this.isLoading = false;
        if (data) {
          console.log("This email has already been registerd");
          this.emailAlreadyExist = true;
          // this.step = 3;
          return { emailExists: true };
        }
        console.log("This email hasn't been registerd");
        return null;
      })
    )
  }

  nextStep(): void {

    if (this.step < 3 || this.form.valid) {
      this.step++;
      console.log("Current step is " + this.step);
      console.log(this.form.value);
    }
  }

  onSubmit(): void {
    this.authservice.addUserInfo(this.form.value);
    console.log("register-page.component; appUserRegister: " + JSON.stringify(this.authservice.appUserRegister));
    this.router.navigate(['/register/plan']);
  }
}
