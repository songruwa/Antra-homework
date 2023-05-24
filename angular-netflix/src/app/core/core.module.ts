import { AuthLocalInterceptor } from './interceptor/auth-local.interceptor';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InjectionToken, ModuleWithProviders, NgModule } from "@angular/core";

export const AuthServer = new InjectionToken<string>('');



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CoreModule {
  public static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: AuthServer,
          useValue: 'http://localhost:4231',
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthLocalInterceptor,
          multi: true,
        }
      ]
    }
  }
 }
