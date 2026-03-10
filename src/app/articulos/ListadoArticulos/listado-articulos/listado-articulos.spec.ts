import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoArticulos } from './listado-articulos';

describe('ListadoArticulos', () => {
  let component: ListadoArticulos;
  let fixture: ComponentFixture<ListadoArticulos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoArticulos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoArticulos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
