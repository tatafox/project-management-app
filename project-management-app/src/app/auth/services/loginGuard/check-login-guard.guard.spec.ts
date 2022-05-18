import { TestBed } from '@angular/core/testing';

import { CheckLoginGuardGuard } from './check-login-guard.guard';

describe('CheckLoginGuardGuard', () => {
  let guard: CheckLoginGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckLoginGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
