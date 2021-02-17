import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CepService } from '../../../../../_services/cep.service';
import { ITutor } from '../../_model/ITutor';
import { TutorService } from '../../_service/tutor.service';
import { ToastService } from '../../../../../_services/toast.service';
import { AnimalService } from '../../animal/_service/animal.service';
import { IAnimal } from '../../animal/_model/IAnimal';
import { Page } from '../../../../../_services/model/Page';

@Component({
  selector: 'app-tutor-novo',
  templateUrl: './tutor-novo.component.html',
  styleUrls: ['./tutor-novo.component.scss'],
})
export class TutorNovoComponent implements OnInit, OnDestroy {
  podeAdicionarAnimal = false;
  apresentarAnimalForm = false;
  animais: Page<IAnimal> = { lista: [] };
  private tutorCadastrado?: ITutor;

  constructor(
    private cepService: CepService,
    private tutorService: TutorService,
    private animalService: AnimalService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {}

  novoAnimal(cancelado?: boolean): void {
    this.apresentarAnimalForm = !this.apresentarAnimalForm;
  }

  salvarTutor(tutorForm: FormGroup): void {
    if (this.tutorCadastrado) {
      this.atualizar(tutorForm);
      return;
    }
    this.salvar(tutorForm);
  }

  salvarAnimal(animalForm: FormGroup): void {
    const animal = { ...(animalForm.value as IAnimal), idTutor: this.tutorCadastrado?.id };
    this.animalService.salvar(animal).subscribe((animalCadastrado) => {
      this.apresentarAnimalForm = true;
      this.animais.lista?.push(animalCadastrado);
      this.toastService.success('Cadastro realizado com sucesso.');
    });
    console.log(this.animais);
  }

  private atualizar(tutorForm: FormGroup): void {
    const tutor = { ...(tutorForm.value as ITutor), tipo: 'TUTOR' };
    this.tutorService.atualizar(this.tutorCadastrado?.id as string, tutor).subscribe(
      (tutorAtualizado) => {
        this.tutorCadastrado = tutorAtualizado;
        this.toastService.success('Informações atualizadas com sucesso.');
      },
      (msg) => this.toastService.error(msg)
    );
  }

  private salvar(tutorForm: FormGroup): void {
    const tutor = { ...(tutorForm.value as ITutor), tipo: 'TUTOR' };
    this.tutorService.salvar(tutor).subscribe(
      (tutorCadastrado) => {
        this.podeAdicionarAnimal = true;
        this.tutorCadastrado = tutorCadastrado;
        this.toastService.success('Informações cadastradas com sucesso.');
      },
      (msg) => this.toastService.error(msg)
    );
  }

  ngOnDestroy(): void {
    this.tutorCadastrado = {};
  }
}
