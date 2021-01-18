import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(),
    senha: new FormControl(),
  });

  constructor() {}

  ngOnInit(): void {}

  acessar() {
    console.log('values', this.loginForm.value);
  }
}
