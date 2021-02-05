import { AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList, TemplateRef } from '@angular/core';
import { PrimeTemplate } from 'primeng/api';

@Component({
  selector: 'app-vnw-table',
  templateUrl: './vnw-table.component.html',
  styleUrls: ['./vnw-table.component.scss'],
})
export class VnwTableComponent<T> implements AfterContentInit {
  @Input()
  public data: any[] = [];
  @ContentChildren(PrimeTemplate)
  templates: QueryList<any> | null = null;
  headerTemplate: TemplateRef<any> | null = null;
  bodyTemplate: TemplateRef<any> | null = null;

  constructor() {}

  gePrimeTemplateByType(type: string): PrimeTemplate {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.templates?.find((template: PrimeTemplate) => template.getType() === type);
  }

  ngAfterContentInit() {
    this.headerTemplate = this.gePrimeTemplateByType('header').template;
    this.bodyTemplate = this.gePrimeTemplateByType('body').template;
  }
}
