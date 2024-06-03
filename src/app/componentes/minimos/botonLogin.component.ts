import { Component, Output, EventEmitter, Input } from '@angular/core';
import { MaterialModule } from '@app/modulos/material.module';
import { PipesModule } from '@app/modulos/pipes.module';
import { DataService } from '@app/servicios/data.service';

@Component({
  selector: 'lta-boton-login',
  standalone: true,
  imports: [
    MaterialModule,
    PipesModule
  ],
  template: `
  @if (data.iniciado) {
    <button mat-flat-button
            (click)="login()"
            [disabled]="disabled"
            [disabledInteractive]="disabled"
            [innerHTML]="interfaz('login-button-text')"
            [matTooltip]="interfaz('login-error-solucion')"
            [ariaLabel]="interfaz('login-button-aria-label')">
    </button>
  }
  `,
  styles: []
})
export class BotonLoginComponent {
  @Output() oprime: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() disabled: boolean = false;
  constructor(public data: DataService) { }
  interfaz(llave: string): string {
    return this.data.getInterfaz(llave);
  }
  login(): void {
    this.oprime.emit(true);
  }
}
