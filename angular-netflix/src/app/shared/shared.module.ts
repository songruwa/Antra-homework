import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { JwtModule, JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt'


@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CoreModule.forRoot()
  ],
  // https://stackoverflow.com/questions/49739277/nullinjectorerror-no-provider-for-jwthelperservice
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService],
  exports: [
    NavbarComponent
  ],

})
export class SharedModule { }
