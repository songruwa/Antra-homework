import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';



@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CoreModule.forRoot(),
  ],
  exports: [
    NavbarComponent
  ],
  
})
export class SharedModule { }
