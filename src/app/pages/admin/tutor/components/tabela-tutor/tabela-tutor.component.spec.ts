import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaTutorComponent } from './tabela-tutor.component';

describe('TabelaTutorComponent', () => {
  let component: TabelaTutorComponent;
  let fixture: ComponentFixture<TabelaTutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelaTutorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
