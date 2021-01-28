import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TutorComponent } from './tutor/tutor.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { AnimalComponent } from './animal/animal.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'consulta',
    component: ConsultaComponent,
  },
  {
    path: 'tutor',
    component: TutorComponent,
  },
  {
    path: 'animal',
    component: AnimalComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
