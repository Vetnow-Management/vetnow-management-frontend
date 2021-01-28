import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    usuario: new FormControl(),
    senha: new FormControl(),
  });

  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  ngOnInit(): void {}

  cadastrar() {
    void this.router.navigate(['cadastro']);
  }

  acessar() {
    const { usuario, senha } = this.loginForm.value;
    this.authenticationService.login(usuario, senha);
    void this.router.navigate(['admin']);
  }
}
