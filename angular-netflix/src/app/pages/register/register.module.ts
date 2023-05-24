import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterPageComponent } from './register-page/register-page.component';

import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { CoreModule } from '../../core/core.module';
import { AuthService } from '../../service/auth.service';
import { RegisterPlanComponent } from './register-plan/register-plan.component';


@NgModule({
  declarations: [
    RegisterPageComponent,
    RegisterPlanComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    CoreModule.forRoot(),
  ],
  providers: [AuthService],
})
export class RegisterModule { }
