import { Routes } from '@angular/router';
import { PrincipalBuscarArticulos } from './articulos/BuscarArticulos/paginas/principal-buscar-articulos/principal-buscar-articulos';
import { MenuPrincipal } from './MenuPrincipal/menu-principal/menu-principal';

export const routes: Routes = [
  
  { path: '', component: MenuPrincipal},
  { path: 'articulos/BuscarArticulos', component: PrincipalBuscarArticulos },
  { path: '**', redirectTo: '' }
];

