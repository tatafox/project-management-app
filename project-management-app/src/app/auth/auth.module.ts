import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material/material.module';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UserAuthServiceService } from './services/auth-service/user-auth-service.service';
import { CheckLoginGuardGuard } from './services/loginGuard/check-login-guard.guard';
import { PopupComponent } from './components/modals/popup/popup.component';
import { HaveToAuthComponent } from './components/modals/have-to-auth/have-to-auth.component';
import { SuccessRegistrComponent } from './components/modals/success-registr/success-registr.component';
import { ProtectAuthPagesGuard } from './services/mainGuard/protect-auth-pages.guard';
import { GetUsersService } from './services/userList/get-users.service';
import { UserNotFoundComponent } from './components/modals/user-not-found/user-not-found.component';
import { EditComponent } from './components/edit/edit.component';
import { UserEditService } from './services/user-edit/user-edit.service';
import { UserIsExistComponent } from './components/modals/user-is-exist/user-is-exist.component';

const routes: Routes = [
  { path: '', component: AdminPageComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  declarations: [
    AdminPageComponent,
    LoginComponent,
    SignUpComponent,
    PopupComponent,
    HaveToAuthComponent,
    SuccessRegistrComponent,
    UserNotFoundComponent,
    EditComponent,
    UserIsExistComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    HttpClientModule,
  ],
  exports: [RouterModule, AdminPageComponent, SignUpComponent, LoginComponent],
  providers: [
    UserAuthServiceService,
    CheckLoginGuardGuard,
    ProtectAuthPagesGuard,
    GetUsersService,
    UserEditService,
  ],
})
export class AuthModule {}
