import { Component, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BaseLang } from '@app/librerias/base';

@Component({
  selector: 'lta-boton-login',
  standalone: true,
  imports: [
    MatButtonModule
  ],
  template: `
  @if (interfaz) {
    <button mat-flat-button
            (click)="login()"
            [innerHTML]="interfaz['login-button-text'][idioma]"
            [ariaLabel]="interfaz['login-button-aria-label'][idioma]">
    </button>
  }
  `,
  styles: []
})
export class BotonLoginComponent extends BaseLang {
  @Output() oprime: EventEmitter<boolean> = new EventEmitter<boolean>();
  login(): void {
    this.oprime.emit(true);
  }
}
