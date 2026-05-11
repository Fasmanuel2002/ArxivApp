import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { ArxivService } from './arxiv-service';

describe('ArxivService', () => {
  let service: ArxivService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ArxivService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
