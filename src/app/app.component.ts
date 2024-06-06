import { Component, OnDestroy, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from '@compartidos/login/login.component';
import { Auth, User, authState } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { DataService } from '@servicios/data.service';
import { NavbarComponent } from '@compartidos/navbar/navbar.component';

@Component({
  selector: 'lta-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LoginComponent,
    NavbarComponent
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
  apps: string[] = [];
  constructor(private data: DataService) {
    this.susEstAuth = this.estAuth.subscribe((usuarioAuth: User | null) => this.usuario = usuarioAuth);
    this.susInit = this.data.init().subscribe((resp: boolean) => this.init = resp);
    this.data.apps.subscribe((apps$: string[] | null) => {
      if (apps$) {
        this.apps = apps$;
        console.log(this.apps);
      }
    });
  }
  ngOnDestroy(): void {
    this.susEstAuth.unsubscribe();
    this.susInit.unsubscribe();
  }
}