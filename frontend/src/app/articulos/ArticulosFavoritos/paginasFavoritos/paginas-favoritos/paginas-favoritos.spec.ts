import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginasFavoritos } from './paginas-favoritos';

describe('PaginasFavoritos', () => {
  let component: PaginasFavoritos;
  let fixture: ComponentFixture<PaginasFavoritos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginasFavoritos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginasFavoritos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
