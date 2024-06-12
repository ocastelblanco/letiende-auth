import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FichaMenuComponent } from '@minimos/ficha-menu/ficha-menu.component';
import { DataService } from '@servicios/data.service';

@Component({
  selector: 'lta-menu-fichas',
  standalone: true,
  imports: [
    FichaMenuComponent,
    RouterLink
  ],
  template: `
  <p>Ya estás autenticado con el nombre {{ data.usuario.displayName }}, email {{ data.usuario.email }}</p>
  @if (data.usuario.photoURL) {
  <img [src]="data.usuario.photoURL"
       style="max-width: 60px;">
  }
  <div class="menu-fichas">
    @for (app of data.apps; track app) {
    <a lta-ficha-menu [app]="app"
                    [routerLink]="['/','app', app.nombre]">
    </a>
    }
  </div>
`,
  styles: [`
  .menu-fichas {
    display: flex;
    padding: 1em;
    .lta-ficha-menu {
      text-decoration: none;
    }
  }
  `]
})
export class MenuFichasComponent {
  constructor(public data: DataService) { }
}
