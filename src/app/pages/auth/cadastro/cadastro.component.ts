import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CadastroService } from './service/cadastro.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../_services/toast.service';
import { IEmpresaNovo } from './_model/IEmpresaNovo';
import { MessageError } from '../../../_services/model/MessageError';
import { IEmpresa } from './_model/IEmpresa';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent implements OnInit {
  submitted = false;
  cadastroForm: FormGroup = new FormGroup({});

  constructor(
    private router: Router,
    private cadastroService: CadastroService,
    private formBuilder: FormBuilder,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    const { required, minLength, maxLength, email, pattern } = Validators;
    this.cadastroForm = this.formBuilder.group({
      razaoSocial: [null, [required, maxLength(50)]],
      documento: [null, [required, minLength(14)]],
      contato: this.formBuilder.group({
        email: [null, [required, maxLength(50), email]],
        telefone: [null, [required, minLength(11), maxLength(12)]],
      }),
      usuario: this.formBuilder.group({
        usuario: [null, [required, minLength(5), maxLength(100)]],
        senha: [null, [required, minLength(5), maxLength(20)]],
      }),
    });
  }

  acessar(): void {
    void this.router.navigate(['']);
  }

  cadastrar(): void {
    this.submitted = true;
    if (this.cadastroForm.invalid) return;
    this.cadastroService.cadastrar(this.cadastroForm.value as IEmpresaNovo).subscribe(
      (empresaCadastrada: IEmpresa) => {
        this.toastService.success(
          'Cadastro realizado com sucesso.',
          ` Bem-vindo(a) ${empresaCadastrada.razaoSocial ?? '-'} ao portal VETNOW.`
        );
        void this.router.navigate(['']);
      },
      (error: MessageError) => {
        this.toastService.error(
          'Ooops',
          'Ocorreu um erro interno, entre em contato com um dos nossos administradores ou tente novamente mais tarde!'
        );
      }
    );
  }

  changeEmail() {
    const usuario = this.group('usuario') as FormGroup;
    usuario.get('usuario')?.setValue(this.contato.email.value);
  }

  get cadastro() {
    return this.cadastroForm.controls;
  }

  get contato() {
    const contatoGroup = this.group('contato') as FormGroup;
    return contatoGroup.controls;
  }

  get usuario() {
    const contatoGroup = this.group('usuario') as FormGroup;
    return contatoGroup.controls;
  }

  private group(group: string): AbstractControl | null {
    return this.cadastroForm.get(group);
  }
}
