import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from '../material/material.module';
import { PopupLogoutComponent } from './modals/popup-logout/popup-logout.component';

@NgModule({
  declarations: [FooterComponent, HeaderComponent, PopupLogoutComponent],
  imports: [CommonModule, RouterModule, MaterialModule],
  exports: [FooterComponent, HeaderComponent],
})
export class CoreModule {}
