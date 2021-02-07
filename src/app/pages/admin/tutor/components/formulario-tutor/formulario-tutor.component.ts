import { Component, Input, OnInit } from '@angular/core';
import { ITutor } from '../../model/ITutor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-tutor',
  templateUrl: './formulario-tutor.component.html',
  styleUrls: ['./formulario-tutor.component.scss'],
})
export class FormularioTutorComponent implements OnInit {
  tutorForm: FormGroup = new FormGroup({});

  @Input() excluirAtivo = false;

  @Input() informacoes: ITutor = {};

  minDate?: Date;

  maxDate: Date = new Date();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    const { required, minLength, maxLength, email } = Validators;
    const { nome, dataNascimento, documento, contato, endereco } = this.informacoes;
    this.tutorForm = this.formBuilder.group({
      nome: [nome, [required, maxLength(50)]],
      dataNascimento: [dataNascimento, [required]],
      documento: [documento, [required, minLength(14)]],
      contato: this.formBuilder.group({
        email: [contato?.email, [required, maxLength(50), email]],
        telefone: [contato?.telefone, [required, minLength(11), maxLength(12)]],
        celular: [contato?.celular, [required, minLength(11), maxLength(12)]],
      }),
      endereco: this.formBuilder.group({
        cep: [endereco?.cep, [required, maxLength(8), maxLength(8)]],
        logradouro: [endereco?.logradouro, [required]],
        bairro: [endereco?.bairro, [required]],
        cidade: [endereco?.localidade, [required]],
        estado: [endereco?.uf, [required]],
        complemento: [endereco?.complemento, [required]],
      }),
    });
  }
}
