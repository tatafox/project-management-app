import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HaveToAuthComponent } from './have-to-auth.component';

describe('HaveToAuthComponent', () => {
  let component: HaveToAuthComponent;
  let fixture: ComponentFixture<HaveToAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HaveToAuthComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HaveToAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
