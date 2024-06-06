import { Component, inject } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from '@servicios/data.service';

@Component({
  selector: 'lta-boton-logout',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  template: `
  @if (data.iniciado) {
    <button mat-icon-button
            (click)="logout()"
            [ariaLabel]="interfaz('logout-button-aria-label')">
      <mat-icon>logout</mat-icon>
    </button>
  }
  `,
  styles: []
})
export class BotonLogoutComponent {
  auth: Auth = inject(Auth);
  constructor(public data: DataService) { }
  interfaz(llave: string): string {
    return this.data.getInterfaz(llave);
  }
  logout(): void {
    signOut(this.auth)
      .then(() => console.log('Se ha salido correctamente'))
      .catch((error) => console.log('Ha habido un error de desconexión: ', error));
  }
}
