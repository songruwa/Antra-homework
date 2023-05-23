import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AuthService } from './service/auth.service';

export function initializeApp(authService: AuthService) {
  return (): Promise<any> => { 
    return authService.loadUser();
  }
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule.forRoot(),
    SharedModule,
  ],
  providers: [
    AuthService,
    { 
      provide: APP_INITIALIZER, 
      useFactory: initializeApp, 
      deps: [AuthService], 
      multi: true 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
