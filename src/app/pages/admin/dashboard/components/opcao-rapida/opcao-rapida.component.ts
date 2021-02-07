import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-opcao-rapida',
  templateUrl: './opcao-rapida.component.html',
  styleUrls: ['./opcao-rapida.component.scss'],
})
export class OpcaoRapidaComponent implements OnInit {
  @Input() opcao: any;

  constructor() {}

  ngOnInit(): void {}
}
