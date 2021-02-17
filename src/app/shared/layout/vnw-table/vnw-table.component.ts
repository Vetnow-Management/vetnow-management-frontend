import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { PrimeTemplate } from 'primeng/api';
import { IPagination } from './model/IPagination';
import { Page } from '../../../_services/model/Page';

@Component({
  selector: 'app-vnw-table',
  templateUrl: './vnw-table.component.html',
  styleUrls: ['./vnw-table.component.scss'],
})
export class VnwTableComponent<T> implements AfterContentInit {
  @Input() paginacao: Page<T> = {};
  @ContentChildren(PrimeTemplate)
  templates: QueryList<any> | null = null;
  headerTemplate: TemplateRef<any> | null = null;
  bodyTemplate: TemplateRef<any> | null = null;

  @Output() paginaAlteradaEvent = new EventEmitter<IPagination>();

  tamanhoAtual = 10;

  constructor() {}

  get lista(): T[] {
    return this.paginacao.lista as T[];
  }

  pagina(pagina: IPagination) {
    this.paginaAlteradaEvent.emit(pagina);
  }

  gePrimeTemplateByType(type: string): PrimeTemplate {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.templates?.find((template: PrimeTemplate) => template.getType() === type);
  }

  ngAfterContentInit() {
    this.headerTemplate = this.gePrimeTemplateByType('header').template;
    this.bodyTemplate = this.gePrimeTemplateByType('body').template;
  }
}
