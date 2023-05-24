import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { UserRole } from 'src/app/service/interface/user-auth.interface';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, debounceTime, map, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router'; 
import { of } from 'rxjs'; 


@Component({
  selector: 'app-register-plan',
  templateUrl: './register-plan.component.html',
  styleUrls: ['./register-plan.component.css']
})
export class RegisterPlanComponent {
  selecedColumn: 'USER' | 'SUPERUSER' | 'ADMIN' = 'ADMIN';

  constructor(private readonly authservice: AuthService, private router: Router, private route: ActivatedRoute) {}

  selectPlan(user: 'USER' | 'SUPERUSER' | 'ADMIN') {
    this.selecedColumn = user;
    console.log(this.selecedColumn);
  }

  handleNavigate() {

    console.log("In register-plan.component, the userValue is "+this.authservice.userValue);
    const { jwtToken } = this.authservice.userValue;
    console.log("userValue in authservice is : "+ JSON.stringify(this.authservice.userValue));
    console.log(jwtToken);
    if (jwtToken) {
      console.log("jwtToken exists, and it's: "+jwtToken);
      this.authservice.upgradePermission({role: UserRole[this.selecedColumn]}).subscribe()
    } else {
      console.log("jwtToken doesn't exist")
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
