import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { MaterialModule } from '../material/material.module';
import { BoardsPageComponent } from './pages/boards-page/boards-page.component';
import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './components/board/board.component';
import { BoardModalComponent } from './components/modal/board-modal/board-modal.component';
import { ColumnModalComponent } from './components/modal/column-modal/column-modal.component';
import { TaskModalComponent } from './components/modal/task-modal/task-modal.component';
import { TaskItemComponent } from './components/board/task-item/task-item.component';
import { BoardsListComponent } from './components/boards-list/boards-list.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MainPageComponent,
    ErrorPageComponent,
    BoardsPageComponent,
    BoardComponent,
    TaskItemComponent,
    BoardModalComponent,
    ColumnModalComponent,
    TaskModalComponent,
    BoardsListComponent,
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
    MaterialModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    BoardRoutingModule,
  ],
  exports: [],
})
export class BoardModule {}
