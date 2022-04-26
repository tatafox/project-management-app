import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';

const routes: Routes = [{ path: '', component: AdminPageComponent }];

@NgModule({
  declarations: [AdminPageComponent],
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
