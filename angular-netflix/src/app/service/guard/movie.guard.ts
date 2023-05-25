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



    const {jwtToken, role} = this.authService.userValue;
    // const jwtToken = localStorage.getItem('access_token');
    // const role = localStorage.getItem("")

    // Check weather the route can be activated;
    if (
      jwtToken &&
      role &&
      (role === UserRole.ADMIN || role === UserRole.SUPERUSER)
    ) {
      return true;
    } 
    // else if (!jwtToken) {
    //   this.router.navigate(['/register/plan'], {
    //     queryParams: { returnUrl: state.url },
    //   });
    // } 
    else {
      this.router.navigate(['/register/plan'], {
        queryParams: { returnUrl: state.url },
      });
    }
    return false;     
    // or false if you want to cancel the navigation  
  }

  // canLoad(route: Route, segments: UrlSegment[]): boolean {
  //   const { jwtToken, role } = this.authService.userValue;
  //   if (
  //     jwtToken &&
  //     role &&
  //     (role === UserRole.ADMIN || role === UserRole.SUPERUSER)
  //   ) {
  //     return true;
  //   } 
  //   // else if (!jwtToken){
  //   //   this.router.navigate(['/register/plan']);

  //   // } 
  //   else {
  //     this.router.navigate(['/register/plan']);
  //   }
  //   return false;
  // }
  
}
