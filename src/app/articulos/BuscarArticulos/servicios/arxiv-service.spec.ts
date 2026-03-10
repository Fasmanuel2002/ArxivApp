import { TestBed } from '@angular/core/testing';

import { ArxivService } from './arxiv-service';

describe('ArxivService', () => {
  let service: ArxivService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArxivService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
