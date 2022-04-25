import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { MaterialModule } from '../material/material.module';
import { BoardsPageComponent } from './boards-page/boards-page.component';
import { BoardRoutingModule } from './board-routing.module';

@NgModule({
  declarations: [
    MainPageComponent,
    AdminPageComponent,
    ErrorPageComponent,
    BoardsPageComponent,
  ],
  imports: [CommonModule, BoardRoutingModule, MaterialModule],
  exports: [MainPageComponent],
})
export class BoardModule {}
