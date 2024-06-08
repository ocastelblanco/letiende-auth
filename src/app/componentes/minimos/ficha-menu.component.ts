import { Component, Input } from '@angular/core';
import { MaterialModule } from '@modulos/material.module';
import { App } from '@servicios/data.service';

@Component({
  selector: 'lta-ficha-menu',
  standalone: true,
  imports: [
    MaterialModule
  ],
  template: `
  @if (app) {
  <mat-card class="ficha-menu">
    <div class="imagen">
      <img mat-card-image [src]="app.ilustracion">
    <!-- Ilustración de https://undraw.co/search con color naranja -->
    </div>
    <mat-card-header>
      <mat-card-title>{{app.titulo}}</mat-card-title>
    </mat-card-header>
  </mat-card>
  }
  `,
  styles: [`
  @use "../../../estilos/letiende-auth-tema" as tema;
  @use "@angular/material" as mat;
  $color-fondo-img: mat.get-theme-color(tema.$light-theme, "primary", 60);
  $color-fondo-card: mat.get-theme-color(tema.$light-theme, "primary-container");
  .ficha-menu {
    width: 360px;
    background-color: $color-fondo-card;
    cursor: pointer;
    &:hover {
      @include mat.elevation(4);
    }
    .imagen {
      width: 100%;
      background-color: $color-fondo-img;
      border-radius: inherit;
      .mat-mdc-card-image {
        width: 100%;
      }
    }
    .mat-mdc-card-header {
      .mat-mdc-card-title {
        height: 2em;
        text-transform: uppercase;
        font-weight: 500;
      }
    }
  }
  `]
})
export class FichaMenuComponent {
  @Input() app: App | null = null;
}