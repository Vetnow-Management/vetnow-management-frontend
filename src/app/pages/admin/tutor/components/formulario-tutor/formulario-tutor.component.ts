import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ITutor } from '../../model/ITutor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ICep from '../../model/ICep';
import { CepService } from '../../../../../services/cep.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-formulario-tutor',
  templateUrl: './formulario-tutor.component.html',
  styleUrls: ['./formulario-tutor.component.scss'],
})
export class FormularioTutorComponent implements OnInit {
  cep: ICep = {};

  tutorForm: FormGroup = new FormGroup({});

  @Output() tutorFormEvent = new EventEmitter<FormGroup>();

  @Input() excluirAtivo = false;

  @Input() informacoes: ITutor = {};

  minDate?: Date;

  maxDate: Date = new Date();

  disabledLogradouro = true;

  constructor(private formBuilder: FormBuilder, private cepService: CepService) {}

  ngOnInit(): void {
    const { required, minLength, maxLength, email } = Validators;
    const { nome, dataNascimento, documento, contato, endereco } = this.informacoes;
    this.tutorForm = this.formBuilder.group({
      nome: [nome, [required, maxLength(100)]],
      dataNascimento: [dataNascimento, [required]],
      documento: [documento, [required, minLength(11), maxLength(11)]],
      contato: this.formBuilder.group({
        email: [contato?.email, [required, maxLength(50), email]],
        telefone: [contato?.telefone, [required, minLength(10), maxLength(10)]],
        celular: [contato?.celular, [required, minLength(11), maxLength(11)]],
      }),
      endereco: this.formBuilder.group({
        cep: [endereco?.cep, [required, maxLength(8), maxLength(8)]],
        logradouro: [endereco?.logradouro, [required, maxLength(100)]],
        bairro: [endereco?.bairro, [required, maxLength(100)]],
        cidade: [endereco?.localidade, [required, maxLength(100)]],
        estado: [endereco?.uf, [required, maxLength(2)]],
        complemento: [endereco?.complemento, [required, maxLength(100)]],
      }),
    });
  }

  salvarTutor(): void {
    void this.tutorFormEvent.emit(this.tutorForm);
  }

  buscarCep(): void {
    const { endereco } = this.tutorForm.value as ITutor;
    this.cepService.buscar(endereco?.cep as string).subscribe((cep: ICep) => {
      this.cep = cep;
      this.disabledLogradouro = false;
    });
  }
}
