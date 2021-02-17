import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { AnimalComponent } from './tutor/animal/animal.component';
import { OpcaoRapidaComponent } from './dashboard/components/opcao-rapida/opcao-rapida.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TooltipModule } from 'primeng/tooltip';
import { DividerModule } from 'primeng/divider';
import { LayoutModule } from '../../shared/layout/layout.module';
import { FormularioAnimalComponent } from './tutor/animal/components/formulario-animal/formulario-animal.component';
import { CalendarModule } from 'primeng/calendar';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { DropdownModule } from 'primeng/dropdown';
import { TabelaAnimalComponent } from './tutor/animal/components/tabela-animal/tabela-animal.component';
import { NgxMaskModule } from 'ngx-mask';
import { ToolbarModule } from 'primeng/toolbar';
import { RippleModule } from 'primeng/ripple';
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
  declarations: [
    DashboardComponent,
    ConsultaComponent,
    AnimalComponent,
    OpcaoRapidaComponent,
    FormularioAnimalComponent,
    TabelaAnimalComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FontAwesomeModule,
    TooltipModule,
    DividerModule,
    LayoutModule,
    CalendarModule,
    ReactiveFormsModule,
    InputTextModule,
    CascadeSelectModule,
    DropdownModule,
    NgxMaskModule,
    ToolbarModule,
    RippleModule,
    AutoCompleteModule,
  ],
  exports: [FormularioAnimalComponent, TabelaAnimalComponent, AnimalComponent],
})
export class AdminModule {}
