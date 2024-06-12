import { Component, Input, effect } from '@angular/core';
import { MaterialModule } from '@modulos/material.module';
import { App, DataService } from '@servicios/data.service';
import { fichaMenuAnimations } from '@librerias/animations';

@Component({
  selector: 'a[lta-ficha-menu]',
  host: {
    'class': 'lta-ficha-menu'
  },
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './ficha-menu.component.html',
  styleUrl: './ficha-menu.component.scss',
  animations: fichaMenuAnimations
})
export class FichaMenuComponent {
  @Input() app: App = {} as App;
  over: boolean = false;
  lang: string = 'es';
  constructor(public data: DataService) {
    effect(() => this.lang = this.data.idioma());
  }
}