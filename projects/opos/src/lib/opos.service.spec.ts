import { TestBed } from '@angular/core/testing';

import { OposService } from './opos.service';

describe('OposService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OposService = TestBed.get(OposService);
    expect(service).toBeTruthy();
  });
});
