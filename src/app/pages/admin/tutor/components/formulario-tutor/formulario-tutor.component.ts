import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITutor } from '../../_model/ITutor';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import ICep from '../../_model/ICep';
import { CepService } from '../../../../../_services/cep.service';

@Component({
  selector: 'app-formulario-tutor',
  templateUrl: './formulario-tutor.component.html',
  styleUrls: ['./formulario-tutor.component.scss'],
})
export class FormularioTutorComponent implements OnInit {
  @Output() tutorFormEvent = new EventEmitter<FormGroup>();

  @Input() excluirAtivo = false;

  @Input() informacoes: ITutor = { contato: {}, endereco: {} };

  cep: ICep = {};

  submitted = false;

  tutorForm: FormGroup = new FormGroup({});

  minDate?: Date;

  maxDate: Date = new Date();

  disabledLogradouro = true;

  constructor(private formBuilder: FormBuilder, private cepService: CepService) {}

  ngOnInit(): void {
    const { required, minLength, maxLength, email } = Validators;
    this.tutorForm = this.formBuilder.group({
      nome: [null, [required, maxLength(100)]],
      dtNascimento: [null, [required]],
      documento: [null, [required, minLength(11), maxLength(11)]],
      contato: this.formBuilder.group({
        email: [null, [required, maxLength(50), email]],
        telefone: [null, [minLength(10), maxLength(10)]],
        celular: [null, [required, minLength(11), maxLength(11)]],
      }),
      endereco: this.formBuilder.group({
        cep: [null, [required, maxLength(8), maxLength(8)]],
        logradouro: [null, [required, maxLength(100)]],
        bairro: [null, [required, maxLength(100)]],
        localidade: [null, [required, maxLength(100)]],
        uf: [null, [required, maxLength(2)]],
        complemento: [null, [maxLength(100)]],
      }),
    });
  }

  get tutorControls() {
    return this.tutorForm.controls;
  }

  get endereco() {
    const enderecoGroup = this.group('endereco') as FormGroup;
    return enderecoGroup.controls;
  }

  get contato() {
    const contatoGroup = this.group('contato') as FormGroup;
    return contatoGroup.controls;
  }

  group(group: string): AbstractControl | null {
    return this.tutorForm.get(group);
  }

  salvarTutor(): void {
    this.submitted = true;
    if (this.tutorForm.invalid) return;
    void this.tutorFormEvent.emit(this.tutorForm);
  }

  buscarCep(): void {
    const { endereco } = this.tutorForm.value as ITutor;
    this.cepService.buscar(endereco?.cep as string).subscribe((cep: ICep) => {
      this.cep = cep;
      this.disabledLogradouro = false;
    });
  }

  field(name: string): AbstractControl | null {
    return this.tutorForm.get(name);
  }
}
