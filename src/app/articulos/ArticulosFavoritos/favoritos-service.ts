import { effect, Injectable, signal } from '@angular/core';
import { environment } from '../../../enviroments/environment.development';
import { ArxivOut, ArxivSuccess } from '../BuscarArticulos/interfaces/arxiv-input';


@Injectable({
  providedIn: 'root',
})
export class FavoritosService {
  ArticulosFavoritos = signal<ArxivOut[]> (this.cargarArticulos())

  private cargarArticulos(){
    const articulos = localStorage.getItem(environment.STORAGE_KEY)
    return articulos ? JSON.parse(articulos) : []
  }

  guardarArticulos = effect(() => {
    const articulos_favoritos = this.ArticulosFavoritos()
    localStorage.setItem(environment.STORAGE_KEY, JSON.stringify(articulos_favoritos))
    console.log("Se ha actualizado el LocalStorage")
  })

  addArticuloFavorito(articulo : ArxivOut){
    this.ArticulosFavoritos.update(listaActualArticulos => [...listaActualArticulos, articulo])
  }
  
  removeFavoritoArticulo(query : string){
    this.ArticulosFavoritos.update(listaActualArticulos => 
      listaActualArticulos.filter(articulo => articulo.id !== query)
    )
  }

}
