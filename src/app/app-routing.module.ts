import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileaioComponent } from './modules/profileaio/profileaio.component';
import { HomeComponent } from './modules/home/home.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { ApiTestingComponent } from './modules/api-testing/api-testing.component';
import { AuthGuardService } from './core/route-guard/auth-guard.service';
import { ProxyMenuComponent } from './modules/proxy/proxy-menu/proxy-menu.component';
import { CallbackComponent } from './shared/callback/callback.component';

const routes: Routes  = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'profileaio', component: ProfileaioComponent, canActivate: [AuthGuardService]},
  { path: 'proxy', component: ProxyMenuComponent, canActivate: [AuthGuardService]},
  { path: 'callback', component: CallbackComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  { path: 'api', component: ApiTestingComponent},
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
