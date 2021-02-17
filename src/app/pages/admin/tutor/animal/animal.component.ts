import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.scss'],
})
export class AnimalComponent implements OnInit {
  @Output() animalFormEvent = new EventEmitter<FormGroup>();
  @Input() apresentarAnimalForm = false;
  @Input() podeAdicionarAnimal = false;

  constructor() {}

  ngOnInit(): void {}

  novo(): void {
    this.apresentarAnimalForm = !this.apresentarAnimalForm;
  }

  salvar(animalForm: FormGroup): void {
    this.animalFormEvent.emit(animalForm);
    //todo chamar o servico para adicionar
  }

  cancelar(cancelado: boolean): void {
    this.apresentarAnimalForm = cancelado;
  }
}
