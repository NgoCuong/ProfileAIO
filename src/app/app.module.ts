import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ProfileaioComponent } from './profileaio/profileaio.component';
import { ProxygenComponent } from './proxygen/proxygen.component';
import { ProfileService } from './_services/profile.service';
import { AuthService } from './auth/auth.service';
import { CallbackComponent } from './callback/callback.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProfileaioComponent,
    ProxygenComponent,
    CallbackComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ProfileService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
