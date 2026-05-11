import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { PrincipalBuscarArticulos } from './principal-buscar-articulos';

describe('PrincipalBuscarArticulos', () => {
  let component: PrincipalBuscarArticulos;
  let fixture: ComponentFixture<PrincipalBuscarArticulos>;
  let httpTesting: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrincipalBuscarArticulos],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrincipalBuscarArticulos);
    component = fixture.componentInstance;
    httpTesting = TestBed.inject(HttpTestingController);
    await fixture.whenStable();
  });

  afterEach(() => {
    httpTesting?.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
