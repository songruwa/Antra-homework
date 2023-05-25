import { Injectable, Inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { AuthServer } from '../core.module';

@Injectable()
export class AuthLocalInterceptor implements HttpInterceptor {

  // https://jasonwatmore.com/post/2022/11/29/angular-14-user-registration-and-login-example-tutorial#account-service-ts
  
  constructor(private authService: AuthService,
    @Inject(AuthServer) private authServerPath: string) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // const user = this.authService.userValue.role;
    const jwtToken = localStorage.getItem('access_token');
    const isLoggedIn = jwtToken;
    const isApiUrl = request.url.startsWith(
      `${this.authServerPath}/auth/userupdate`
      );
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${jwtToken}`
        }
      })
    }


    return next.handle(request);
  }
}
