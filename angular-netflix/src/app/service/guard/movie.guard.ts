import { Injectable } from '@angular/core';
import { Router, Route, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { UserRole } from '../interface/user-auth.interface';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})

// movie.guard: when user are ADMIN or SUPER, user can access movie-detail route; otherwise, user will be lead to register/plan route
// NOTE!!!!

// After using update role information, log out first, then user can be lead to movie detail route successfully
export class MovieGuard implements CanActivate {

  private jwtHelper = new JwtHelperService();


  constructor(
    private router: Router,
    private authService: AuthService,
  ){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // const {jwtToken, role} = this.authService.userValue;
    const jwtToken = localStorage.getItem("access_token");
    const role = localStorage.getItem("role");
  
    // Logging user token and role information
    console.log("JWT Token: ", jwtToken);
    console.log("User role: ", role);
  
    // Check whether the route can be activated
    if (
      jwtToken &&
      role &&
      (role === UserRole.ADMIN || role === UserRole.SUPERUSER)
    ) {
      console.log('Access granted. Role is either ADMIN or SUPERUSER.');
      return true;
    } else {
      console.log('Access denied. Redirecting to register/plan.');
      this.router.navigate(['/register/plan'], {
        queryParams: { returnUrl: state.url },
      });
    }
    return false;     
  }
  
}
