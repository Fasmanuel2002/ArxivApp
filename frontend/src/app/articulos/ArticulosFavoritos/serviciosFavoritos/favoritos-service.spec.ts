import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { FavoritosService } from './favoritos-service';

describe('FavoritosService', () => {
  let service: FavoritosService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(FavoritosService);
    httpTesting = TestBed.inject(HttpTestingController);
    httpTesting.expectOne('/api/favoritos').flush({ data: [], message: 'ok' });
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
