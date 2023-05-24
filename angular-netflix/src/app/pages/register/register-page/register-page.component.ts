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
  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    username: ['', [Validators.required, Validators.minLength(4)]],
    tmdb_key: ['', [Validators.required, Validators.minLength(30)]]
  });

  isLoading = false;
  selecedColumn: 'USER' | 'SUPERUSER' | 'ADMIN' = 'ADMIN';


  constructor(private fb: FormBuilder, private http: HttpClient, private readonly authservice: AuthService,private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
      // this.form = this.fb.group({
      //   email: ['', [Validators.required, Validators.email]],
      //   password: ['', [Validators.required, Validators.minLength(8)]],
      //   username: ['', [Validators.required, Validators.minLength(4)]],
      //   tmdb_key: ['', [Validators.required, Validators.minLength(30)]]
      // });
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
  
    if (this.step < 3 || this.form.valid) {
      this.step++;
      console.log("Current step is "+ this.step);
      console.log(this.form.value);
    } 
  }

    onSubmit(): void {
      this.authservice.addUserInfo(this.form.value);
      console.log("register-page.component; appUserRegister: "+JSON.stringify(this.authservice.appUserRegister));
      this.router.navigate(['/register/plan']);
    }

    // else if (this.step === 4) {
    //   console.log("About to call addUserInfo");
    //   this.authservice.addUserInfo(this.form.value);
    //   console.log(this.authservice.appUserRegister);
    // }
  

// nextStep(): void {
//   let stepValid = false;
  
//   if (this.step === 1) {
//       stepValid = true;
//   } else if (this.step === 2) {
//       stepValid = (this.email?.valid || false) && (this.password?.valid || false);
//   } else if (this.step === 3) {
//       stepValid = (this.username?.valid || false) && (this.tmdb_key?.valid || false);
//   }

//   if (stepValid) {
//       this.step++;
//       console.log(this.form.value);
//   } else {
//       window.alert('Form not valid');
//       console.log("Form doesn't work");
//   }
// }


  // onSubmit(): void {
  //   if (this.form.valid) {
  //     this.authservice.addUserInfo(this.form.value);
  //     console.log("when clicking the submit button, the form value is " + this.form.value);
  //     this.nextStep();
  //   }
  // }

  // selectPlan(user: 'USER' | 'SUPERUSER' | 'ADMIN') {
  //   this.selecedColumn = user;
  //   console.log(this.selecedColumn);
  // }

  // handleNavigate() {

  //   this.authservice.addUserInfo(this.form.value);
  //   console.log(this.authservice.appUserRegister);

  //   const { jwtToken } = this.authservice.userValue;
  //   console.log("userValue in authservice is : "+ JSON.stringify(this.authservice.userValue));
  //   console.log(jwtToken);
  //   if (jwtToken) {
  //     console.log("jwtToken exists, and it's: "+jwtToken);
  //     this.authservice.upgradePermission({role: UserRole[this.selecedColumn]}).subscribe()
  //   } else {
  //     console.log("jwtToken doesn't exist")
  //     this.authservice.signup({ role: UserRole[this.selecedColumn] })
  //       .pipe(
  //         tap(() => {
  //           console.log('Signup successful');
  //           window.alert('Your registration succeed');
  //           this.router.navigate(['/']); // navigate to home page
  //         }),
  //         catchError(error => {
  //           console.log('Signup failed', error);
  //           window.alert('Your registration failed');
  //           return of(error);
  //         })
  //       )
  //       .subscribe();
  //   }
  // }
}