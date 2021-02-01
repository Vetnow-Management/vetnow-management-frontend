import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { LayoutModule } from '../../shared/layout/layout.module';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [LoginComponent, CadastroComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    CheckboxModule,
    LayoutModule,
    NgxMaskModule.forRoot(),
  ],
})
export class AuthModule {}
