import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, debounceTime, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';



@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  email: string = '';
  public emailExist = false;
  isLoading = false;
  form!: FormGroup;

  constructor(private router: Router, private http: HttpClient, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email], [this._emailExists.bind(this)]]
    })
  }

  signUp(): void {
    this.router.navigate(['/register'], { queryParams: { email: this.form.get('email')?.value } });
    console.log("the email I wanna register is:" + this.form.get('email')?.value);
  }



  _emailExists = (control: AbstractControl): Observable<ValidationErrors | null> => {
    const val = control.value;
    const url = "http://localhost:4231/auth/check-email";
    this.emailExist = false;

    return this.http.post(url, { email: val }).pipe(
      tap((_) => { this.isLoading = true }),
      debounceTime(500),
      map((data: any) => {
        console.log(data)
        this.isLoading = false;
        if (data) {
          console.log("This email has already been registerd");
          this.emailExist = true;
          // this.step = 3;
          return { emailExists: true };
        }
        console.log("This email hasn't been registerd");
        return null;
      })
    )
  }

}

