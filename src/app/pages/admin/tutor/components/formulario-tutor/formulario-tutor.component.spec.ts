import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioTutorComponent } from './formulario-tutor.component';

describe('FormularioTutorComponent', () => {
  let component: FormularioTutorComponent;
  let fixture: ComponentFixture<FormularioTutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioTutorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
