import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MenubarModule } from 'primeng/menubar';
import { CardComponent } from './card/card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [NavBarComponent, CardComponent],
  imports: [CommonModule, MenubarModule, InputTextModule, ReactiveFormsModule],
  exports: [NavBarComponent, CardComponent],
})
export class LayoutModule {}
