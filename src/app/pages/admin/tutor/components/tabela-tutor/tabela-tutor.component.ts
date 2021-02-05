import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabela-tutor',
  templateUrl: './tabela-tutor.component.html',
  styleUrls: ['./tabela-tutor.component.scss'],
})
export class TabelaTutorComponent implements OnInit {
  public tutores = [
    {
      nome: 'Renan Ravelli',
      documento: '05398078186',
      telefone: '61 998240215',
    },
    {
      nome: 'Renan Ravelli',
      documento: '05398078186',
      telefone: '61 998240215',
    },
    {
      nome: 'Renan Ravelli',
      documento: '05398078186',
      telefone: '61 998240215',
    },
    {
      nome: 'Renan Ravelli',
      documento: '05398078186',
      telefone: '61 998240215',
    },
    {
      nome: 'Renan Ravelli',
      documento: '05398078186',
      telefone: '61 998240215',
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  cadastrar(): void {
    void this.router.navigate(['admin', 'tutor', 'cadastro']);
  }
}
