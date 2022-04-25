import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { BoardsPageComponent } from './boards-page/boards-page.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'boards', component: BoardsPageComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardRoutingModule {}
