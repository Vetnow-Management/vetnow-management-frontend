import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TutorRoutingModule } from './tutor-routing.module';
import { TutorComponent } from './components/tutor.component';
import { NgxMaskModule } from 'ngx-mask';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { LayoutModule } from '../../../shared/layout/layout.module';
import { ToolbarModule } from 'primeng/toolbar';
import { TutorNovoComponent } from './components/tutor-novo/tutor-novo.component';
import { TabelaTutorComponent } from './components/tabela-tutor/tabela-tutor.component';
import { FormularioTutorComponent } from './components/formulario-tutor/formulario-tutor.component';
import { CalendarModule } from 'primeng/calendar';
import { DetalheTutorComponent } from './detalhe-tutor/detalhe-tutor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [
    TutorComponent,
    TutorNovoComponent,
    TabelaTutorComponent,
    FormularioTutorComponent,
    DetalheTutorComponent,
  ],
  imports: [
    CommonModule,
    TutorRoutingModule,
    NgxMaskModule,
    TableModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    LayoutModule,
    ToolbarModule,
    CalendarModule,
    ReactiveFormsModule,
    TooltipModule,
  ],
})
export class TutorModule {}
