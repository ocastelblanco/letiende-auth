import { Component, OnDestroy, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from '@compartidos/login/login.component';
import { Auth, User, authState, updateProfile } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { DataService, App } from '@servicios/data.service';
import { NavbarComponent } from '@compartidos/navbar/navbar.component';
import { MenuFichasComponent } from '@compartidos/menu-fichas.component';

@Component({
  selector: 'lta-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LoginComponent,
    NavbarComponent,
    MenuFichasComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnDestroy {
  init: boolean = false;
  auth: Auth = inject(Auth);
  estAuth: any = authState(this.auth);
  susEstAuth: Subscription = {} as Subscription;
  susInit: Subscription = {} as Subscription;
  apps: App[] = [];
  constructor(public data: DataService) {
    this.susEstAuth = this.estAuth.subscribe((usuarioAuth: User | null) => {
      if (usuarioAuth) {
        this.data.usuario = usuarioAuth;
        if (!this.data.usuario.displayName) {
          updateProfile(this.data.usuario, {
            displayName: 'Administrador Le Tiende',
            photoURL: 'https://live.staticflickr.com/65535/53783700832_6e06a53b9e_o_d.png'
          });
        }
        this.data.apps_.subscribe((apps$: App[] | null) => {
          if (apps$) {
            this.data.apps = apps$;
            this.data.apps.forEach((app: App) => app.ilustracion = `assets/apps/${app.nombre}/ilustracion.svg`);
          }
        });
      } /** else {
        this.usuario = {
          displayName: null,
          email: 'letiende.co@gmail.com',
          phoneNumber: null,
          photoURL: null,
          providerId: '',
          uid: ''
        } as User;
        this.cargaFichasApps();
      } //*/
    });
    this.susInit = this.data.init().subscribe((resp: boolean) => this.init = resp);
  }
  ngOnDestroy(): void {
    this.susEstAuth.unsubscribe();
    this.susInit.unsubscribe();
  }
}