import { Routes } from '@angular/router';
import { SignInComponent } from './authentication/sign-in.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { authGuard } from './guards/auth.guard';
import { SignUpComponent } from './sign-up/sign-up.component';

export const routes: Routes = [
  {
    path: 'home',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full',
  },
  {
    path: 'sign-in',
    component: SignInComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'user-profile',
    component: UserProfileComponent,
  },
  {
    path: 'user-profile/id',
    component: UserProfileComponent,
  },
];
