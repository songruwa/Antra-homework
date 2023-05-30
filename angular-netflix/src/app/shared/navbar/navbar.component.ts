import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public accessTToken: string | null | undefined;
  public decodedTToken: any;
  public userrrName: any;

  constructor(public authService: AuthService, public jwthelper: JwtHelperService) { }

  ngOnInit(): void {
    this.accessTToken = localStorage.getItem('access_token');
    if (this.accessTToken) {
      this.decodedTToken = this.jwthelper.decodeToken(this.accessTToken);
      this.userrrName = this.decodedTToken.username;
      console.log(this.userrrName);

    }
  }


  logout() {
    this.authService.logout();
  }
}
