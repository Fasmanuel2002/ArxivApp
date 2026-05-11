import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { PaginasFavoritos } from './paginas-favoritos';

describe('PaginasFavoritos', () => {
  let component: PaginasFavoritos;
  let fixture: ComponentFixture<PaginasFavoritos>;
  let httpTesting: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginasFavoritos],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginasFavoritos);
    component = fixture.componentInstance;
    httpTesting = TestBed.inject(HttpTestingController);
    httpTesting.expectOne('/api/favoritos').flush({ data: [], message: 'ok' });
    await fixture.whenStable();
  });

  afterEach(() => {
    httpTesting?.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
