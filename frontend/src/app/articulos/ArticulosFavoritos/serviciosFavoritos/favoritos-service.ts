import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../enviroments/environment.development';
import { ArxivOut } from '../../BuscarArticulos/interfaces/arxiv-input';
import { finalize } from 'rxjs';

interface ApiResponse<T> {
  data: T;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class FavoritosService {
  private httpClient = inject(HttpClient);

  ArticulosFavoritos = signal<ArxivOut[]>([]);
  cargando = signal(false);
  error = signal<string | null>(null);

  constructor() {
    this.cargarArticulos();
  }

  cargarArticulos() {
    this.cargando.set(true);
    this.error.set(null);

    this.httpClient
      .get<ApiResponse<ArxivOut[]>>(environment.favoritosApiUrl)
      .pipe(finalize(() => this.cargando.set(false)))
      .subscribe({
        next: (response) => this.ArticulosFavoritos.set(response.data ?? []),
        error: (error) => this.error.set(this.obtenerMensajeError(error)),
      });
  }

  addArticuloFavorito(articulo: ArxivOut) {
    const favoritosArticulos = this.ArticulosFavoritos();

    if (favoritosArticulos.find((x) => x.id === articulo.id)) {
      this.error.set('Este articulo ya esta en favoritos.');
      return;
    }

    this.error.set(null);
    this.httpClient
      .post<ApiResponse<ArxivOut>>(environment.favoritosApiUrl, articulo)
      .subscribe({
        next: (response) => {
          this.ArticulosFavoritos.update((listaActualArticulos) => [
            response.data,
            ...listaActualArticulos,
          ]);
        },
        error: (error) => this.error.set(this.obtenerMensajeError(error)),
      });
  }

  removeFavoritoArticulo(query: string) {
    const favoritosAnteriores = this.ArticulosFavoritos();

    this.ArticulosFavoritos.update((listaActualArticulos) =>
      listaActualArticulos.filter((articulo) => articulo.id !== query),
    );
    this.error.set(null);

    this.httpClient
      .delete<ApiResponse<{ id: string }>>(
        `${environment.favoritosApiUrl}/${encodeURIComponent(query)}`,
      )
      .subscribe({
        error: (error) => {
          this.ArticulosFavoritos.set(favoritosAnteriores);
          this.error.set(this.obtenerMensajeError(error));
        },
      });
  }

  download(){
    const favoritosArticulos = this.ArticulosFavoritos()

    const json = JSON.stringify(favoritosArticulos)
    
    const enlace = document.createElement('a')

    enlace.href = "data:application/json;charset=utf-8," + encodeURIComponent(json)
    
    enlace.download = "favoritos.json";

    enlace.click();
  
  }

  private obtenerMensajeError(error: unknown) {
    if (
      error &&
      typeof error === 'object' &&
      'error' in error &&
      error.error &&
      typeof error.error === 'object' &&
      'message' in error.error &&
      typeof error.error.message === 'string'
    ) {
      return error.error.message;
    }

    return 'No se pudo conectar con el servidor.';
  }
}
