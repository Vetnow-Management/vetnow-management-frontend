import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.scss'],
})
export class AnimalComponent implements OnInit {
  apresentarAnimalForm = false;

  constructor() {}

  ngOnInit(): void {}

  novo(): void {
    this.apresentarAnimalForm = !this.apresentarAnimalForm;
  }

  adicionar(): void {
    this.apresentarAnimalForm = !this.apresentarAnimalForm;
    //todo chamar o servico para adicionar
  }
}
