import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MenubarModule } from 'primeng/menubar';
import { CardComponent } from './card/card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PanelMenuModule } from 'primeng/panelmenu';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarItemComponent } from './sidebar/components/sidebar-item/sidebar-item.component';

@NgModule({
  declarations: [NavBarComponent, CardComponent, SidebarComponent, SidebarItemComponent],
  imports: [CommonModule, MenubarModule, InputTextModule, ReactiveFormsModule, PanelMenuModule, FontAwesomeModule],
  exports: [NavBarComponent, CardComponent, SidebarComponent],
})
export class LayoutModule {}
