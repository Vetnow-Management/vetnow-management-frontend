import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { AnimalComponent } from './tutor/animal/animal.component';

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
    loadChildren: () => import('./tutor/tutor.module').then((m) => m.TutorModule),
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
