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
  { path: 'profileaio', component: ProfileaioComponent},
  { path: 'proxy', component: ProxyMenuComponent},
  { path: 'callback', component: CallbackComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  { path: 'api', component: ApiTestingComponent},
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
