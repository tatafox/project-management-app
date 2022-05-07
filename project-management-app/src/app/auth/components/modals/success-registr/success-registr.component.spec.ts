import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessRegistrComponent } from './success-registr.component';

describe('SuccessRegistrComponent', () => {
  let component: SuccessRegistrComponent;
  let fixture: ComponentFixture<SuccessRegistrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessRegistrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessRegistrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
