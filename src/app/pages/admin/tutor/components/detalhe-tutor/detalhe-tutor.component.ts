import { Component, OnInit } from '@angular/core';
import { TutorService } from '../../_service/tutor.service';
import { ITutor } from '../../_model/ITutor';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../../../_services/toast.service';
import { ITipoPessoa } from '../../../_model/ITipoPessoa';
import { IAnimal } from '../../animal/_model/IAnimal';
import { AnimalService } from '../../animal/_service/animal.service';
import { Page } from '../../../../../_services/model/Page';

@Component({
  selector: 'app-detalhe-tutor',
  templateUrl: './detalhe-tutor.component.html',
  styleUrls: ['./detalhe-tutor.component.scss'],
})
export class DetalheTutorComponent implements OnInit {
  id?: string;
  apresentarAnimalForm = true;
  tutor: ITutor = { contato: {}, endereco: {} };
  animais: Page<IAnimal> = {};

  constructor(
    private router: Router,
    private tutorService: TutorService,
    private animalService: AnimalService,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute
  ) {
    this.id = this.activatedRoute.snapshot.params.id as string;
  }

  ngOnInit(): void {
    this.detalheTutorAtual();
  }

  detalheTutorAtual(): void {
    this.pesquisarAnimais(this.id);
    if (!this.tutorService.tutorDetalhe.id) {
      this.tutorService.buscar(this.id as string).subscribe((tutor: ITutor) => (this.tutor = tutor));
      return;
    }
    this.tutor = this.tutorService.tutorDetalhe;
  }

  pesquisarAnimais(idTutor?: string): void {
    this.animalService.pesquisar({ idTutor }).subscribe((page) => (this.animais = page));
  }

  novoAnimal(animalForm?: boolean): void {
    this.apresentarAnimalForm = !this.apresentarAnimalForm;
  }

  salvarTutor(tutorForm: FormGroup) {
    const tutor = { ...(tutorForm.value as ITutor), tipo: ITipoPessoa.TUTOR };
    this.tutorService.atualizar(this.id as string, tutor).subscribe(
      () => this.toastService.success('Informações atualizadas com sucesso.'),
      (error) => this.toastService.error('Não foi possível atualizar o tutor. Tente novamente!', error)
    );
  }

  salvarAnimal(animalForm: FormGroup) {
    const animal = { ...(animalForm.value as IAnimal), idTutor: this.id };
    this.animalService.salvar(animal).subscribe(
      (animalCadastrado) => {
        this.apresentarAnimalForm = !this.apresentarAnimalForm;
        this.animais.lista?.push(animalCadastrado);
        this.toastService.success('Cadastro realizado com sucesso.');
      },
      (error) => this.toastService.error('Não foi possível cadastrar o animal. Tente novamente!', error)
    );
  }

  excluir() {
    this.tutorService.desativar(this.id).subscribe(
      () => {
        this.toastService.success('Tutor excluido com sucesso.');
        void this.router.navigate(['admin', 'tutor']);
      },
      (error) => this.toastService.error('Não foi possível excluir o tutor. Tente novamente!', error)
    );
  }
}
