import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CadastroService } from './service/cadastro.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../services/toast.service';
import { EmpresaNovo } from './model/EmpresaNovo';
import { MessageError } from '../../../model/MessageError';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent implements OnInit {
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
        usuario: [null, [required, minLength(5), maxLength(20)]],
        senha: [null, [required, minLength(5), maxLength(20)]],
      }),
    });
  }

  acessar(): void {
    void this.router.navigate(['']);
  }

  cadastrar(): void {
    if (this.cadastroForm.valid) {
      this.cadastroService.cadastrar(this.cadastroForm.value as EmpresaNovo).subscribe(
        (empresaCadastrada) => {
          this.toastService.success('Obaaa', `Bem-vindo ${empresaCadastrada.razaoSocial ?? '-'} ao portal VETNOW.`);
          void this.router.navigate(['']);
        },
        (error: MessageError) => {
          this.toastService.error(
            'Ooops',
            'Ocorreu um erro interno, entre em contato com um dos nossos administradores ou tente novamente mais tarde!'
          );
        }
      );
      return;
    }
    this.toastService.warn('Aten\u00E7\u00E3o', 'Verifique se todos os campos est\u00E3o preenchidos corretamente.');
  }
}
