import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './auth/components/edit/edit.component';
import { LoginComponent } from './auth/components/login/login.component';
import { SignUpComponent } from './auth/components/sign-up/sign-up.component';
import { CheckLoginGuardGuard } from './auth/services/loginGuard/check-login-guard.guard';
import { ProtectAuthPagesGuard } from './auth/services/mainGuard/protect-auth-pages.guard';
import { ErrorPageComponent } from './board/pages/error-page/error-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  {
    path: 'admin',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [ProtectAuthPagesGuard],
  },
  {
    path: 'signup',
    component: SignUpComponent,
    canActivate: [ProtectAuthPagesGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [ProtectAuthPagesGuard],
  },
  {
    path: 'edit',
    component: EditComponent,
  },
  {
    path: 'main',
    loadChildren: () =>
      // eslint-disable-next-line implicit-arrow-linebreak
      import('./board/board.module').then((m) => m.BoardModule),
    canActivate: [CheckLoginGuardGuard],
  },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
