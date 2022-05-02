import { TestBed } from '@angular/core/testing';

import { ProtectAuthPagesGuard } from './protect-auth-pages.guard';

describe('ProtectAuthPagesGuard', () => {
  let guard: ProtectAuthPagesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProtectAuthPagesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
