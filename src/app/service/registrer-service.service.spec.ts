import { TestBed } from '@angular/core/testing';

import { RegistrerServiceService } from './registrer-service.service';

describe('RegistrerServiceService', () => {
  let service: RegistrerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
