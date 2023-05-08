import { TestBed } from '@angular/core/testing';

import { MItemService } from './m-item.service';

describe('MItemService', () => {
  let service: MItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
