import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorNovoComponent } from './tutor-novo.component';

describe('TutorNovoComponent', () => {
  let component: TutorNovoComponent;
  let fixture: ComponentFixture<TutorNovoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorNovoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
