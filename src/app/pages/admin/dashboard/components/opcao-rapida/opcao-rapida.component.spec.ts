import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcaoRapidaComponent } from './opcao-rapida.component';

describe('OpcaoRapidaComponent', () => {
  let component: OpcaoRapidaComponent;
  let fixture: ComponentFixture<OpcaoRapidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpcaoRapidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcaoRapidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
