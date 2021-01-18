import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';

@NgModule({
  declarations: [LoginComponent, CadastroComponent],
  imports: [CommonModule, AuthRoutingModule],
})
export class AuthModule {}
