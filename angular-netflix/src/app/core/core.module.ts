import { CommonModule } from '@angular/common';
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
      ]
    }
  }
 }
