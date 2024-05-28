import { AfterViewInit, Component, inject } from '@angular/core';
import { Auth, UserCredential, signInWithEmailAndPassword } from '@angular/fire/auth';
import { BaseLang } from '@app/librerias/base';
import { BotonLoginComponent } from '@app/componentes/minimos/botonLogin.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'lta-login',
  standalone: true,
  imports: [
    BotonLoginComponent,
    MatCardModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends BaseLang implements AfterViewInit {
  auth: Auth = inject(Auth);
  inputData: { email: string, clave: string } = { email: '', clave: '' };
  login(): void {
    signInWithEmailAndPassword(this.auth, this.inputData.email, this.inputData.clave)
      .then((credencial: UserCredential) => console.log('Se ha logueado correctamente con el email', credencial.user.email))
      .catch((error: any) => console.log('No se ha podido loguear correctamente debido a ', error));
  }
  ngAfterViewInit(): void {
    document.getElementById('input-email')?.focus();
  }
}
