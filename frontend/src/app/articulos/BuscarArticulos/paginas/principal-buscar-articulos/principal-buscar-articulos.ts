import { Component, inject, signal } from '@angular/core';
import { ArxivService } from '../../servicios/arxiv-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ArxivOut, ArxivSuccess, ResultadoConsultaArXiv } from '../../interfaces/arxiv-input';
import { RouterLink } from '@angular/router';
import { FavoritosService } from '../../../ArticulosFavoritos/serviciosFavoritos/favoritos-service';
import { finalize } from 'rxjs';
@Component({
  selector: 'app-principal-buscar-articulos',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './principal-buscar-articulos.html',
  styleUrl: './principal-buscar-articulos.css',
})
export class PrincipalBuscarArticulos {
  
  _ArxivService = inject(ArxivService)
  _FavoritosArticulosService = inject(FavoritosService)
  query = ''
  resultado = signal<ResultadoConsultaArXiv | null> (null)
  ultimaBusqueda = signal('')
  cargando = signal(false)
  error = signal<string | null>(null)
  

  buscarArticulo(query: string) {
    const textoBusqueda = query.trim();

    if (!textoBusqueda) {
      this.error.set('Introduce un titulo o palabra clave.');
      return;
    }

    this.cargando.set(true);
    this.error.set(null);
    this.ultimaBusqueda.set(textoBusqueda);

    this._ArxivService
      .buscarArticulos(textoBusqueda)
      .pipe(finalize(() => this.cargando.set(false)))
      .subscribe({
        next: (xml: any) => {
          this.resultado.set(xml);
          this.query = '';
        },
        error: () => {
          this.resultado.set(null);
          this.error.set('No se pudo consultar ArXiv.');
        },
      });
}

  toggleFavortito(articulo : ArxivOut){
    this._FavoritosArticulosService.addArticuloFavorito(articulo)
  }


}
