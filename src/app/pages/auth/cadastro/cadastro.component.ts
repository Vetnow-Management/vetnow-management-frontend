import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CadastroService } from './service/cadastro.service';
import { EmpresaNovo } from './model/EmpresaNovo';
import { Router } from '@angular/router';

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

  constructor(private router: Router, private cadastroService: CadastroService) {}

  ngOnInit(): void {}

  acessar(): void {
    void this.router.navigate(['']);
  }

  cadastrar(): void {
    this.cadastroService
      .cadastrar(this.cadastroForm as EmpresaNovo)
      .subscribe((empresaCadastrada) => console.log('empresa', empresaCadastrada));
  }
}
