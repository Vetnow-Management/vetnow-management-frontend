import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TutorComponent } from './tutor/tutor.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { AnimalComponent } from './animal/animal.component';

@NgModule({
  declarations: [DashboardComponent, TutorComponent, ConsultaComponent, AnimalComponent],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
