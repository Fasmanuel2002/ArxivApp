import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuPrincipal } from "./MenuPrincipal/menu-principal/menu-principal";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuPrincipal],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ArxivApp');
}
