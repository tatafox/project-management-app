import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserIsExistComponent } from './user-is-exist.component';

describe('UserIsExistComponent', () => {
  let component: UserIsExistComponent;
  let fixture: ComponentFixture<UserIsExistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserIsExistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserIsExistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
