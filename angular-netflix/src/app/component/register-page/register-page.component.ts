import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable,map } from 'rxjs';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  step: number = 1;
  form!: FormGroup;


  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email], [this.emailExists.bind(this)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  emailExists(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.http.get<any>('/auth/check-email', {
      params: { email: control.value }
    }).pipe(
      map((response: any) => {
        return response.exists ? { emailExists: true } : null;
      })
    );
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
      console.log('Form submitted:', this.form.value);
      // Handle the form submission logic here
    } else {
      console.log("Form not valid")
    }
  }

}
