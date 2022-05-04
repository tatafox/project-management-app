import { TestBed } from '@angular/core/testing';

import { UserInfoService } from './header-name.service';

describe('HeaderNameService', () => {
  let service: UserInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
