import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MenubarModule } from 'primeng/menubar';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [NavBarComponent, CardComponent],
  imports: [CommonModule, MenubarModule],
  exports: [NavBarComponent, CardComponent],
})
export class LayoutModule {}
