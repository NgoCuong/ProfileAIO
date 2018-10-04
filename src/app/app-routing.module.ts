import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileaioComponent } from './profileaio/profileaio.component';
import { ProxygenComponent } from './proxygen/proxygen.component';
import { HomeComponent } from './home/home.component';
import { CallbackComponent } from './callback/callback.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes  = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'profileaio', component: ProfileaioComponent},
  { path: 'proxygen', component: ProxygenComponent},
  { path: 'callback', component: CallbackComponent},
  { path: 'profile', component: ProfileComponent },
  { path: '**', redirectTo: '' }
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
