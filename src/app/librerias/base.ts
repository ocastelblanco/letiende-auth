import { Component, effect } from '@angular/core';
import { DataService, LangData } from '@app/servicios/data.service';

@Component({
  standalone: true,
  template: ''
})
export class BaseLang {
  idioma: string = 'es';
  interfaz: LangData | null = null;
  constructor(data: DataService) {
    effect(() => this.idioma = data.idioma());
    data.interfaz.subscribe({
      next: (interfaz$) => this.interfaz = interfaz$
    })
  }
}