import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { AnimalComponent } from './animal/animal.component';
import { OpcaoRapidaComponent } from './dashboard/components/opcao-rapida/opcao-rapida.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TooltipModule } from 'primeng/tooltip';
import { DividerModule } from 'primeng/divider';

@NgModule({
  declarations: [DashboardComponent, ConsultaComponent, AnimalComponent, OpcaoRapidaComponent],
  imports: [CommonModule, AdminRoutingModule, FontAwesomeModule, TooltipModule, DividerModule],
})
export class AdminModule {}
