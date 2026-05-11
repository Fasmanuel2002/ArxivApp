import { Component, inject } from '@angular/core';
import { FavoritosService } from '../../serviciosFavoritos/favoritos-service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ArxivOut } from '../../../BuscarArticulos/interfaces/arxiv-input';

@Component({
  selector: 'app-paginas-favoritos',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './paginas-favoritos.html',
  styleUrl: './paginas-favoritos.css',
})
export class PaginasFavoritos {

  _FavoritosArticulosService = inject(FavoritosService)

  constructor() {
    this._FavoritosArticulosService.cargarArticulos();
  }
  
  removeFavoritoArticulo(idFavorito : string){
    this._FavoritosArticulosService.removeFavoritoArticulo(idFavorito);
  }

  guardarComentario(articulo: ArxivOut) {
    this._FavoritosArticulosService.updateComentarioArticulo(articulo);
  }

  downloadLocalStorage(){
    this._FavoritosArticulosService.download()
  }
}
