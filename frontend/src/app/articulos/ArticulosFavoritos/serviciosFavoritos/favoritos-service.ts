import { effect, Injectable, signal } from '@angular/core';
import { environment } from '../../../../enviroments/environment.development';
import { ArxivOut, ArxivSuccess } from '../../BuscarArticulos/interfaces/arxiv-input';
import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { disconnect } from 'node:process';

@Injectable({
  providedIn: 'root',
})
export class FavoritosService {
  _platformId = inject(PLATFORM_ID);
  ArticulosFavoritos = signal<ArxivOut[]> (this.cargarArticulos())

  private cargarArticulos(){
    if (!isPlatformBrowser(this._platformId)) return []; 
    const articulos = localStorage.getItem(environment.STORAGE_KEY)
    return articulos ? JSON.parse(articulos) : []
  }

  guardarArticulos = effect(() => {
    if (!isPlatformBrowser(this._platformId)) return;
    const articulos_favoritos = this.ArticulosFavoritos()
    localStorage.setItem(environment.STORAGE_KEY, JSON.stringify(articulos_favoritos))
    console.log("Se ha actualizado el LocalStorage")
  })

  addArticuloFavorito(articulo : ArxivOut){
    const favoritosArticulos = this.ArticulosFavoritos()
    if (favoritosArticulos.find(x => x.id === articulo.id)){
      console.log("No puedes anañdir este contenido")
      return
    }
    this.ArticulosFavoritos.update(listaActualArticulos => [...listaActualArticulos, articulo])
  }
  
  removeFavoritoArticulo(query : string){
    this.ArticulosFavoritos.update(listaActualArticulos => 
      listaActualArticulos.filter(articulo => articulo.id !== query)
    )
  }

  download(){
    const favoritosArticulos = this.ArticulosFavoritos()

    const json = JSON.stringify(favoritosArticulos)
    
    const enlace = document.createElement('a')

    enlace.href = "data:application/json;charset=utf-8" + encodeURIComponent(json)
    
    enlace.download = "favoritos.json";

    enlace.click();
  
  }

}
