import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TutorService } from '../../service/tutor.service';
import { ITutor } from '../../model/ITutor';

@Component({
  selector: 'app-tabela-tutor',
  templateUrl: './tabela-tutor.component.html',
  styleUrls: ['./tabela-tutor.component.scss'],
})
export class TabelaTutorComponent implements OnInit {
  public tutores: ITutor[] = [
    {
      id: '1',
      nome: 'Renan Ravelli',
      dataNascimento: '08/11/1996',
      documento: '05398078186',
      contato: {
        telefone: '61 998240215',
        celular: '61 998240215',
        email: 'renanravellialves@gmail.com',
      },
      endereco: {
        cep: '73083150',
        logradouro: 'ES 4B LOTE 11',
        bairro: 'Setor de Mansões',
        localidade: 'Sobradinho',
        unidade: 'DF',
      },
    },
    {
      id: '2',
      nome: 'Marcela Souza',
      dataNascimento: '08/11/1996',
      documento: '05398078186',
      contato: {
        telefone: '61 998240215',
        celular: '61 998240215',
        email: 'renanravellialves@gmail.com',
      },
      endereco: {
        cep: '73083150',
        logradouro: 'ES 4B LOTE 11',
        bairro: 'Setor de Mansões',
        localidade: 'Sobradinho',
        unidade: 'DF',
      },
    },
  ];

  constructor(private router: Router, private tutorService: TutorService) {}

  ngOnInit(): void {}

  detalhe(id: string): void {
    this.tutorService.tutorDetalhe = this.tutores.find((t) => t.id === id);
    void this.router.navigate(['admin', 'tutor', id, 'detalhe']);
  }

  cadastrar(): void {
    void this.router.navigate(['admin', 'tutor', 'cadastro']);
  }
}
