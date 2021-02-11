import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TutorComponent } from './components/tutor.component';
import { TutorNovoComponent } from './components/tutor-novo/tutor-novo.component';
import { DetalheTutorComponent } from './components/detalhe-tutor/detalhe-tutor.component';

const routes: Routes = [
  {
    path: '',
    component: TutorComponent,
  },
  {
    path: 'cadastro',
    component: TutorNovoComponent,
  },
  {
    path: ':id/detalhe',
    component: DetalheTutorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TutorRoutingModule {}
