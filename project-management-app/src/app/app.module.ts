import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { boardReducer } from './redux/reducers/board.reducer';
import { CoreModule } from './core/core.module';
import { BoardModule } from './board/board.module';
import { MaterialModule } from './material/material.module';
import { AuthModule } from './auth/auth.module';
import { ConfirmDialogComponent } from './shared/components/confirm-dialog/confirm-dialog.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    CoreModule,
    BoardModule,
    // @ts-ignore
    StoreModule.forRoot({ boardState: boardReducer }),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    HttpClientModule,
    AuthModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  entryComponents: [ConfirmDialogComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
