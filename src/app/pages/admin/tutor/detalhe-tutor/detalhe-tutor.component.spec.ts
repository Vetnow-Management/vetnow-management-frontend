import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheTutorComponent } from './detalhe-tutor.component';

describe('DetalheTutorComponent', () => {
  let component: DetalheTutorComponent;
  let fixture: ComponentFixture<DetalheTutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalheTutorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalheTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
