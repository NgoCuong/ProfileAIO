import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './modules/home/home.component';
import { ProfileaioComponent } from './modules/profileaio/profileaio.component';
import { ProxygenComponent } from './modules/proxygen/proxygen.component';
import { ProfileService } from './core/services/profile.service';
import { AuthService } from './core/auth/auth.service';
import { CallbackComponent } from './core/auth/callback/callback.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { TokenInterceptor } from './core/token.interceptor';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { ApiTestingComponent } from './modules/api-testing/api-testing.component';
import { AuthGuardService } from './core/route-guard/auth-guard.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileaioComponent,
    ProxygenComponent,
    CallbackComponent,
    ProfileComponent,
    HeaderComponent,
    FooterComponent,
    ApiTestingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    ProfileService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AuthService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
