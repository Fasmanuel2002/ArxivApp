import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../enviroments/environment.development';

import { Observable, of } from 'rxjs';
import { ResultadoConsultaArXiv } from '../interfaces/arxiv-input';
@Injectable({
  providedIn: 'root',
})
export class ArxivService {
  _httpClient = inject(HttpClient)

  //Es string debido que ArXiv devuelve un STRING XML 
  buscarArticulos(query : string): Observable<string>
  {
    const params = new HttpParams()
    .set('search_query', `all:${query}`)
    .set('start', 0)
    .set('max_results', 5)
    .set('sortBy', "relevance")
    .set('sortOrder', 'ascending')
    
    return this._httpClient.get(environment.arxivQueryUrl, {params, responseType: 'text'})
  }

  /*
  parsearArxiv(xml : string) : ResultadoConsultaArXiv
  {
    if (xml.length == 0){
      return {
        Response : true,
        entries : []
      }
    
    }else if (xml.length != 0) {
      return {
        Response : true,
        entries : []
      }

    }else {
      return {
        Response : false,
        Error : "Not Found the Article"
      }
    }
    }
  resultadoBusquedaArticulo( query: string) : Observable<ResultadoConsultaArXiv>{
    this.buscarArticulos(query).pipe(map(response => ResultadoConsultaArXiv))
    
  }

 */ 
}
