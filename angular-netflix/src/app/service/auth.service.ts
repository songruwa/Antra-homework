import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthServer } from 'src/app/core/core.module';
import { AppUserAuth, UserRole } from '../service/interface/user-auth.interface';
import { AppUserRegister, UserInfo } from '../service/interface/user-signup.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthDto } from '../service/interface/auth-dto.interface';
import { AppUser } from '../service/interface/user-login.interface';
import { MovieService } from './movie.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // https://www.indellient.com/blog/intro-to-rxjs-in-angular-observables-subjects-and-behaviorsubjects/
  private jwtHelper = new JwtHelperService();
  public appUserRegister = new AppUserRegister();
  private userSubject$: BehaviorSubject<AppUserAuth> = new BehaviorSubject({});
  user$: Observable<AppUserAuth> = this.userSubject$.asObservable();
  private refreshTokenTimeout!: ReturnType<typeof setTimeout>;

  private roleMap = {
    'ADMIN': UserRole.ADMIN,
    'SUPERUSER': UserRole.SUPERUSER,
    'USER': UserRole.USER
  };


  get userValue(): AppUserAuth {
    return this.userSubject$.value;
  }
  get appNewUser(): AppUserRegister {
    return this.appUserRegister;
  }
  constructor(
    private readonly router: Router,
    private readonly http: HttpClient,
    private movieservice: MovieService,
    @Inject(AuthServer) private readonly authServerPath: string) { }

  // https://huantao.medium.com/how-to-use-app-initializer-be5d2f801f93
  loadUser(): Promise<any> {
    return new Promise(resolve => {
      const accessToken = localStorage.getItem('access_token');
      const role = localStorage.getItem('role');

      if (accessToken) {
        const { id, username, email, tmdb_key, exp, role } = this.jwtHelper.decodeToken(accessToken);
        this.movieservice.setMyApiKey = tmdb_key;
        const user = { id, username, email, tmdb_key, role, jwtToken: accessToken };
        this.userSubject$.next(user);
        this.startRefreshTokenTimer(exp);
      }
      resolve(true);
    });
  }

  addUserInfo(userInfo: UserInfo) {
    console.log("before updating: ", this.appUserRegister);
    this.appUserRegister = {
      ...this.appUserRegister,
      ...userInfo,
    };
    console.log("after updating: ", this.appUserRegister);

  }

  signup(userRole: { role: UserRole }): Observable<AuthDto | string> {
    this.appUserRegister = {
      ...this.appUserRegister,
      ...userRole,
    };

    console.log("appUserRegister is : " + JSON.stringify(this.appUserRegister));
    const { username, password, email, role, tmdb_key } = this.appUserRegister;

    if (!username || !password || !email || !role || !tmdb_key)
      return of('Registration failed');

    return this.http.post<AuthDto>(
      `${this.authServerPath}/auth/signup`,
      this.appUserRegister
    )
      .pipe(
        tap(({ accessToken, role }: AuthDto) => {
          console.log('JWT Access Token after signup: ', accessToken);
          this.setUserValuebyToken({ accessToken, role })
          this.router.navigate(['/movies']);
        }),
        catchError((error) => {
          return throwError('Something wrong during the signup!', error);
        })
      );
  }

  login(appUser: AppUser): Observable<AuthDto> {
    return this.http.post<AuthDto>(
      `${this.authServerPath}/auth/signin`,
      appUser
    )
      .pipe(
        tap(({ accessToken, role }: AuthDto) => {
          console.log('JWT Access Token after login: ', accessToken);

          this.setUserValuebyToken({ accessToken, role });
          this.router.navigate(['/movies']);
        }),
        catchError((error) => {
          return throwError('Something wrong during the login!', error);
        })
      );
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('role');

    this.movieservice.setMyApiKey = '';
    this.stopRefreshTokenTimer();
    this.userSubject$.next({});
    this.router.navigate(['/login']);
  }

  refreshToken(): Observable<AuthDto | string> {
    const currentToken = localStorage.getItem('access_token');
    if (!currentToken) {
      this.router.navigate(['/']);
      return of('err');
    }
    const { id, username, email, tmdb_key } = this.jwtHelper.decodeToken(currentToken);
    const user = { id, username, email, tmdb_key };
    return this.http.post<AuthDto>(`${this.authServerPath}/auth/refresh-token`, user)
      .pipe(
        tap(({ accessToken, role }: AuthDto) => {
          this.setUserValuebyToken({ accessToken, role });
        }))
  }

  upgradePermission(userRole: { role: UserRole }): Observable<AuthDto> {
    this.stopRefreshTokenTimer();
    console.log(userRole);
    console.log("the userupate api url: " + `${this.authServerPath}/auth/userupdate`)
    return this.http.patch<AuthDto>(`${this.authServerPath}/auth/userupdate`, userRole)
      .pipe(tap(({ accessToken, role }: AuthDto) => {
        this.setUserValuebyToken({ accessToken, role });
        this.updateUserValue();
        this.router.navigate(['/movies']);
      }),
        catchError((error) => {
          return throwError(() => new Error('Something wrong deuring the upgrade!'));
        })
      )
  }

  private setUserValuebyToken = ({ accessToken, role }: AuthDto) => {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('role', role);

    const { id, username, email, tmdb_key, exp } = this.jwtHelper.decodeToken(accessToken);
    this.movieservice.setMyApiKey = tmdb_key;
    const user = { id, username, email, tmdb_key, role, jwtToken: accessToken };
    console.log("user info now after login in: " + JSON.stringify(user));
    this.userSubject$.next(user);
    this.startRefreshTokenTimer(exp);
  }


  private startRefreshTokenTimer(exp: string) {
    const expires = new Date(+exp * 1000);
    const timeout = expires.getTime() - Date.now();
    this.refreshTokenTimeout = setTimeout(() => {
      if (this.userValue.jwtToken) {
        this.refreshToken().subscribe();
      }
    }, timeout)
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }

  updateUserValue() {
    const accessToken = localStorage.getItem('access_token');
    const role = localStorage.getItem('role');

    if (accessToken && role) {
      const { id, username, email, tmdb_key, exp } = this.jwtHelper.decodeToken(accessToken);
      const roleMap = this.roleMap;
      const userRole: UserRole = roleMap[role as keyof typeof roleMap]; // Add the type assertion here
      const user = { id, username, email, tmdb_key, role: userRole, jwtToken: accessToken };
      this.userSubject$.next(user);
      this.startRefreshTokenTimer(exp);

      console.log('Update User Value: ', this.userSubject$.value);

    }
  }

}
