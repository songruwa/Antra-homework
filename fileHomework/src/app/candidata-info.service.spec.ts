import { TestBed } from '@angular/core/testing';

import { CandidataInfoService } from './candidata-info.service';

describe('CandidataInfoService', () => {
  let service: CandidataInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidataInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
