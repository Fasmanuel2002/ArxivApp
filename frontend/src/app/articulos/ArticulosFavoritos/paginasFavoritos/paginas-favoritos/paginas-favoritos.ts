import { Component, inject } from '@angular/core';
import { FavoritosService } from '../../serviciosFavoritos/favoritos-service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-paginas-favoritos',
  imports: [CommonModule, RouterLink],
  templateUrl: './paginas-favoritos.html',
  styleUrl: './paginas-favoritos.css',
})
export class PaginasFavoritos {

  _FavoritosArticulosService = inject(FavoritosService)

  
  removeFavoritoArticulo(idFavorito : string){
    this._FavoritosArticulosService.removeFavoritoArticulo(idFavorito);
  }

  downloadLocalStorage(){
    this._FavoritosArticulosService.download()
  }
}
