import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalBuscarArticulos } from './principal-buscar-articulos';

describe('PrincipalBuscarArticulos', () => {
  let component: PrincipalBuscarArticulos;
  let fixture: ComponentFixture<PrincipalBuscarArticulos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrincipalBuscarArticulos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrincipalBuscarArticulos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
