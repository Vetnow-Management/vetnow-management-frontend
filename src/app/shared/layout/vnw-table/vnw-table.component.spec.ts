import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VnwTableComponent } from './vnw-table.component';

describe('VnwTableComponent', () => {
  let component: VnwTableComponent;
  let fixture: ComponentFixture<VnwTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VnwTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VnwTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
