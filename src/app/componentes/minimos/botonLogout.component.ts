import { Component, inject } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BaseLang } from '@app/librerias/base';

@Component({
  selector: 'lta-boton-logout',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  template: `
  @if (interfaz) {
    <button mat-icon-button
            (click)="logout()"
            [ariaLabel]="interfaz['logout-button-aria-label'][idioma]">
      <mat-icon>logout</mat-icon>
    </button>
  }
  `,
  styles: []
})
export class BotonLogoutComponent extends BaseLang {
  auth: Auth = inject(Auth);
  logout(): void {
    signOut(this.auth)
      .then(() => console.log('Se ha salido correctamente'))
      .catch((error) => console.log('Ha habido un error de desconexión: ', error));
  }
}
