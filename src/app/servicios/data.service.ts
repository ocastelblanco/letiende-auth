import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { User } from '@angular/fire/auth';

export interface LangData {
  [key: string]: { [key: string]: string };
}
export interface App {
  nombre: string;
  titulo: { [key: string]: string };
  descripcion?: { [key: string]: string };
  ilustracion?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {
    effect(() => this.lang = this.idioma());
    this.interfaz.subscribe((interfaz$: any) => this.textos = interfaz$);
  }
  public textos: LangData = {};
  public interfaz: BehaviorSubject<LangData | null> = new BehaviorSubject<LangData | null>(null);
  public apps_: BehaviorSubject<App[] | null> = new BehaviorSubject<App[] | null>(null);
  private funcionesInit: boolean[] = [
    this.http.get<LangData>('assets/lang/lang.json', { responseType: 'json' }).subscribe((interfaz$: LangData) => this.interfaz.next(interfaz$)).closed,
    this.http.get<App[]>('assets/apps/apps.json', { responseType: 'json' }).subscribe((apps$: App[]) => this.apps_.next(apps$)).closed,
  ];
  public lang: string = 'es';
  public idioma: WritableSignal<string> = signal(this.lang);
  public iniciado: boolean = false;
  public usuario: User = {} as User;
  public apps: App[] = [];
  init(): Observable<boolean> {
    return new Observable((suscriptor: Subscriber<boolean>) => {
      this.funcionesInit.forEach((ejFunc: boolean) => { suscriptor.next(ejFunc) });
      suscriptor.complete();
      this.iniciado = true;
    });
  }
  getInterfaz(llave: string): string {
    return this.textos[llave][this.lang];
  }
}
