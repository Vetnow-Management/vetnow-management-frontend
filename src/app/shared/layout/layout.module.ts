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
import { VnwTableComponent } from './vnw-table/vnw-table.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { NgxMaskModule } from 'ngx-mask';
import { ToolbarModule } from 'primeng/toolbar';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CalendarModule } from 'primeng/calendar';
import { TooltipModule } from 'primeng/tooltip';
import { VnwDividerComponent } from './vnw-divider/vnw-divider.component';
import { DividerModule } from 'primeng/divider';

@NgModule({
  declarations: [
    NavBarComponent,
    CardComponent,
    SidebarComponent,
    SidebarItemComponent,
    VnwTableComponent,
    BreadcrumbComponent,
    VnwDividerComponent,
  ],
  imports: [
    CommonModule,
    MenubarModule,
    InputTextModule,
    ReactiveFormsModule,
    PanelMenuModule,
    FontAwesomeModule,
    ButtonModule,
    TableModule,
    NgxMaskModule,
    ToolbarModule,
    BreadcrumbModule,
    CalendarModule,
    TooltipModule,
    DividerModule,
  ],
  exports: [
    NavBarComponent,
    CardComponent,
    SidebarComponent,
    VnwTableComponent,
    BreadcrumbComponent,
    VnwDividerComponent,
  ],
})
export class LayoutModule {}
