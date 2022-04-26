import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const routes: Routes = [{ path: '', component: AdminPageComponent }];

@NgModule({
  declarations: [AdminPageComponent, LoginComponent, SignUpComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [AdminPageComponent, RouterModule],
})
export class AuthModule {}
