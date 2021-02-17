import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TutorService } from '../../_service/tutor.service';
import { ITutor } from '../../_model/ITutor';
import { IPagination } from '../../../../../shared/layout/vnw-table/model/IPagination';
import { Page } from '../../../../../_services/model/Page';
import { ToastService } from '../../../../../_services/toast.service';

@Component({
  selector: 'app-tabela-tutor',
  templateUrl: './tabela-tutor.component.html',
  styleUrls: ['./tabela-tutor.component.scss'],
})
export class TabelaTutorComponent implements OnInit {
  tutores: Page<ITutor> = {};

  constructor(private router: Router, private toastService: ToastService, private tutorService: TutorService) {}

  ngOnInit(): void {
    this.pesquisar();
  }

  excluir(id: string) {
    this.tutorService.desativar(id).subscribe(
      () => {
        this.tutores.lista = this.tutores.lista?.filter((t) => t.id !== id);
        this.toastService.success('Tutor excluido com sucesso.');
        void this.router.navigate(['admin', 'tutor']);
      },
      (error) => this.toastService.error('Não foi possível excluir o tutor. Tente novamente!', error)
    );
  }

  detalhe(id: string): void {
    this.tutorService.tutorDetalhe = this.tutores.lista?.find((t) => t.id === id) as ITutor;
    void this.router.navigate(['admin', 'tutor', id, 'detalhe']);
  }

  paginaAlterada(pagina: IPagination) {
    this.pesquisar(pagina.first, pagina.rows);
  }

  pesquisar(pagina?: number, tamanho?: number): void {
    this.tutorService.pesquisar(tamanho, pagina).subscribe((pagina: Page<ITutor>) => (this.tutores = pagina));
  }
}
