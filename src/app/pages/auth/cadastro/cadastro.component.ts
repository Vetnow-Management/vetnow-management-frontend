import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent implements OnInit {
  cadastroForm: FormGroup = new FormGroup({
    razaoSocial: new FormControl(),
    documento: new FormControl(),
    contato: new FormGroup({
      email: new FormControl(),
      telefone: new FormControl(),
    }),
    usuario: new FormGroup({
      usuario: new FormControl(),
      senha: new FormControl(),
    }),
  });

  constructor() {}

  ngOnInit(): void {}

  cadastrar(): void {
    console.log('values', this.cadastroForm.value);
  }
}
