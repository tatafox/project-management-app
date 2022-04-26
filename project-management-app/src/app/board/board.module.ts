import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { MaterialModule } from '../material/material.module';
import { BoardsPageComponent } from './pages/boards-page/boards-page.component';
import { BoardRoutingModule } from './board-routing.module';
import { BoardsComponent } from './components/boards/boards.component';
import { BoardItemComponent } from './components/boards/board-item/board-item.component';
import { ColumnItemComponent } from './components/boards/column-item/column-item.component';
import { TaskItemComponent } from './components/boards/task-item/task-item.component';
import { BoardModalComponent } from './components/modal/board-modal/board-modal.component';
import { ColumnModalComponent } from './components/modal/column-modal/column-modal.component';
import { TaskModalComponent } from './components/modal/task-modal/task-modal.component';

@NgModule({
  declarations: [
    MainPageComponent,
    ErrorPageComponent,
    BoardsPageComponent,
    BoardsComponent,
    BoardItemComponent,
    ColumnItemComponent,
    TaskItemComponent,
    BoardModalComponent,
    ColumnModalComponent,
    TaskModalComponent,
  ],
  imports: [CommonModule, BoardRoutingModule, MaterialModule],
  exports: [],
})
export class BoardModule {}
