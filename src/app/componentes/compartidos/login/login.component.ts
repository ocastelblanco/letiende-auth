import { AfterViewInit, Component, inject } from '@angular/core';
import { Auth, UserCredential, signInWithEmailAndPassword } from '@angular/fire/auth';
import { BotonLoginComponent } from '@minimos/botonLogin.component';
import { LogoComponent } from '@minimos/logo/logo.component';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { PipesModule } from '@modulos/pipes.module';
import { MaterialModule } from '@app/modulos/material.module';
import { DataService } from '@app/servicios/data.service';

export class VerificaErrores implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const enviado: boolean | null = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || enviado));
  }
}

@Component({
  selector: 'lta-login',
  standalone: true,
  imports: [
    BotonLoginComponent,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    LogoComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements AfterViewInit {
  auth: Auth = inject(Auth);
  emailFormControl: FormControl = new FormControl('', [Validators.required, Validators.email]);
  claveFormControl: FormControl = new FormControl('', [Validators.required]);
  prueba: VerificaErrores = new VerificaErrores();
  constructor(public data: DataService) { }
  interfaz(llave: string): string {
    return this.data.getInterfaz(llave);
  }
  login(): void {
    signInWithEmailAndPassword(this.auth, this.emailFormControl.value, this.claveFormControl.value)
      .then((credencial: UserCredential) => console.log('Se ha logueado correctamente con el email', credencial.user.email))
      .catch((error: any) => console.log('No se ha podido loguear correctamente debido a ', error));
  }
  ngAfterViewInit(): void {
    document.getElementById('input-email')?.focus();
  }
}
