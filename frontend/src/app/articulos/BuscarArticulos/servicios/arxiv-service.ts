import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../enviroments/environment.development';

import { Observable, map } from 'rxjs';

import { ArxivOut, ArxivSuccess } from '../interfaces/arxiv-input';
import { XMLParser } from 'fast-xml-parser';

@Injectable({
  providedIn: 'root',
})
export class ArxivService {

  private httpClient = inject(HttpClient)
  private parser = new XMLParser()

  buscarArticulos(query: string): Observable<ArxivSuccess> {

    const params = new HttpParams()
      .set('search_query', `(ti:${query} OR abs:${query})`)
      .set('start', 0)
      .set('max_results', 10)
      .set('sortBy', 'relevance')
      .set('sortOrder', 'descending')

    return this.httpClient
  .get(environment.arxivQueryUrl, { params, responseType: 'text' }).pipe(
    map(xml => {

      let parsed = this.parser.parse(xml)

      let entries_xml = parsed.feed.entry
      if (!entries_xml) {
        return {
          Response: true,
          entries: []
        }
      }
      let entries: ArxivOut[] = entries_xml.map((entries: any) => {

        let authors;

        if (Array.isArray(entries.author)) {
          authors = entries.author.map((a: any) => a.name);
        } else {
          authors = [entries.author?.name];
        } 
        
        return {
          id: entries.id,
          title: entries.title,
          summary: entries.summary,
          authors,
          published: entries.published,
          updated: entries.updated
        }

      })

      return {
        Response: true,
        entries
      }

    })
  )}
}
//pipe sirve para encadenar operadores que transforman los datos que pasan por un Observable.