import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
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
import { ProtectAuthPagesGuard } from '../auth/services/mainGuard/protect-auth-pages.guard';
import { CheckLoginGuardGuard } from '../auth/services/loginGuard/check-login-guard.guard';
import { SharedModule } from '../shared/shared.module';

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
    // BoardsListComponent,
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
  providers: [ProtectAuthPagesGuard, CheckLoginGuardGuard],
})
export class BoardModule {}
