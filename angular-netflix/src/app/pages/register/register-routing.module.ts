import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPageComponent } from './register-page/register-page.component';
import { RegisterPlanComponent } from './register-plan/register-plan.component';

const routes: Routes = [
  { path: '', component: RegisterPageComponent },
  { path: 'plan', component: RegisterPlanComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
