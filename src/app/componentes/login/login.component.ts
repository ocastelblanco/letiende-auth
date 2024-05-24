import { Component, inject } from '@angular/core';
import { Auth, User, UserCredential, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { environment } from '@environments/environment';

@Component({
  selector: 'lta-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  auth: Auth = inject(Auth);
  autentica(email: string = environment.credenciales.email, clave: string = environment.credenciales.clave): void {
    signInWithEmailAndPassword(this.auth, email, clave)
      .then((credencial: UserCredential) => {
        const usuario: User = credencial.user;
        console.log('Se ha logueado correctamente como ', usuario);
      })
      .catch((error: any) => {
        console.log('No se ha podido loguear correctamente debido a ', error);
      });
  }
  logout(): void {
    signOut(this.auth)
      .then(() => console.log('Se ha salido correctamente'))
      .catch((error) => console.log('Ha habido un error de desconexión: ', error));
  }
}
