import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TutorComponent } from './tutor.component';
import { TutorNovoComponent } from './components/tutor-novo/tutor-novo.component';

const routes: Routes = [
  {
    path: '',
    component: TutorComponent,
  },
  {
    path: 'cadastro',
    component: TutorNovoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TutorRoutingModule {}
