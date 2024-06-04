import { Component } from '@angular/core';
import { MaterialModule } from '@app/modulos/material.module';
import { BotonLogoutComponent } from '@minimos/botonLogout.component';
import { LogoComponent } from '@minimos/logo/logo.component';
import { DataService } from '@app/servicios/data.service';

@Component({
  selector: 'lta-navbar',
  standalone: true,
  imports: [
    MaterialModule,
    BotonLogoutComponent,
    LogoComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(public data: DataService) { }
  interfaz(llave: string): string {
    return this.data.getInterfaz(llave);
  }
}
