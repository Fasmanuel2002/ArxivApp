import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { MenuPrincipal } from './menu-principal';

describe('MenuPrincipal', () => {
  let component: MenuPrincipal;
  let fixture: ComponentFixture<MenuPrincipal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuPrincipal],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuPrincipal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
