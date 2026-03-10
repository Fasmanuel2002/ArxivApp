import { Component, inject, signal } from '@angular/core';
import { ArxivService } from '../../servicios/arxiv-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ArxivOut, ArxivSuccess, ResultadoConsultaArXiv } from '../../interfaces/arxiv-input';

@Component({
  selector: 'app-principal-buscar-articulos',
  imports: [FormsModule, CommonModule],
  templateUrl: './principal-buscar-articulos.html',
  styleUrl: './principal-buscar-articulos.css',
})
export class PrincipalBuscarArticulos {
  
  _ArxivService = inject(ArxivService)
  query = ''
  resultado = signal<ResultadoConsultaArXiv | null> (null)

  buscarArticulo(query: string) {
  this._ArxivService.buscarArticulos(query).subscribe(
    (xml: any) => {
      console.log(xml)
      this.resultado.set(xml);
    this.query = '';
    }
  );
}

}
