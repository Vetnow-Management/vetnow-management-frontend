import { Component, OnInit } from '@angular/core';
import { faPaw, faUserTie, faUserNurse } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  options = [
    { icon: faUserNurse, nome: 'Consulta', descricao: 'Realizar uma nova consulta.', path: '/admin/consulta/cadastro' },
    { icon: faUserTie, nome: 'Tutor', descricao: 'Cadastro rápido de um novo tutor.', path: '/admin/tutor/cadastro' },
    { icon: faPaw, nome: 'Animal', descricao: 'Cadastro rápido de um novo animal.', path: '/admin/animal/cadastro' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
