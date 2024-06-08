import { Component, OnDestroy, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from '@compartidos/login/login.component';
import { Auth, User, authState } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { DataService, App } from '@servicios/data.service';
import { NavbarComponent } from '@compartidos/navbar/navbar.component';
import { FichaMenuComponent } from '@minimos/ficha-menu.component';

@Component({
  selector: 'lta-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LoginComponent,
    NavbarComponent,
    FichaMenuComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy {
  init: boolean = false;
  usuario: User | null = null;
  auth: Auth = inject(Auth);
  estAuth: any = authState(this.auth);
  susEstAuth: Subscription = {} as Subscription;
  susInit: Subscription = {} as Subscription;
  apps: App[] = [];
  constructor(private data: DataService) {
    this.susEstAuth = this.estAuth.subscribe((usuarioAuth: User | null) => {
      if (usuarioAuth) {
        this.usuario = usuarioAuth;
        this.data.apps.subscribe((apps$: string[] | null) => {
          if (apps$) {
            //this.apps = apps$;
          }
        });
      } /**/ else {
        this.usuario = {
          displayName: null,
          email: 'letiende.co@gmail.com',
          phoneNumber: null,
          photoURL: null,
          providerId: '',
          uid: ''
        } as User;
        this.data.apps.subscribe((apps$: string[] | null) => {
          if (apps$) {
            apps$.forEach((app: string) => {
              this.apps.push({
                nombre: app,
                titulo: app,
                ilustracion: `assets/apps/${app}/ilustracion.svg`
              });
            });
          }
        });
      } //*/
    });
    this.susInit = this.data.init().subscribe((resp: boolean) => this.init = resp);
  }
  ngOnDestroy(): void {
    this.susEstAuth.unsubscribe();
    this.susInit.unsubscribe();
  }
}