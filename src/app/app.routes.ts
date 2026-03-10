import { Routes } from '@angular/router';
import { PrincipalBuscarArticulos } from './articulos/BuscarArticulos/paginas/principal-buscar-articulos/principal-buscar-articulos';

export const routes: Routes = [
  { path: '', redirectTo: 'articulos/BuscarArticulos', pathMatch: 'full' },

  { path: 'articulos/BuscarArticulos', component: PrincipalBuscarArticulos },

  // opcional: si alguien entra a una ruta rara
  { path: '**', redirectTo: 'articulos/BuscarArticulos' }
];