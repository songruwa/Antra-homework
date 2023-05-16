import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Observable, debounceTime, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserRole } from 'src/app/service/interface/user-auth.interface';
import { Router, ActivatedRoute } from '@angular/router'; 
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs'; 


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  step: number = 1;
  form!: FormGroup;
  isLoading = false;
  selecedColumn: 'USER' | 'SUPERUSER' | 'ADMIN' = 'ADMIN';


  constructor(private fb: FormBuilder, private http: HttpClient, private readonly authservice: AuthService,private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const email = params['email'];
      console.log("passed parameter'email': " + email);
      this.form = this.fb.group({
        email: [email, [Validators.required, Validators.email], [this.emailExists.bind(this)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
      });
    });
  }
  

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  emailExists = (control: AbstractControl): Observable<ValidationErrors | null> => {
    const val = control.value;
    const url = "http://localhost:4231/auth/check-email";
    return this.http.post(url, { email: val }).pipe(
      tap((_) => { this.isLoading = true }),
      debounceTime(500),
      map((data: any) => {
        console.log(data)
        this.isLoading = false;
        if (data) {
          return { hasEmail: true };
        }
        return null;
      })
    )
  }

  nextStep(): void {
    if (this.step === 1 || this.form.valid) {
      this.step++;
    } else {
      window.alert('Form not valid');
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.authservice.addUserInfo(this.form.value);
      this.nextStep();
    }
  }

  selectPlan(user: 'USER' | 'SUPERUSER' | 'ADMIN') {
    this.selecedColumn = user;
  }

  handleNavigate() {
    const { jwtToken } = this.authservice.userValue;
    if (jwtToken) {
      this.authservice.upgradePermission({role: UserRole[this.selecedColumn]}).subscribe()
    } else {
      this.authservice.signup({ role: UserRole[this.selecedColumn] })
        .pipe(
          tap(() => {
            console.log('Signup successful');
            window.alert('Your registration succeed');
            this.router.navigate(['/']); // navigate to home page
          }),
          catchError(error => {
            console.log('Signup failed', error);
            window.alert('Your registration failed');
            return of(error);
          })
        )
        .subscribe();
    }
  }
}