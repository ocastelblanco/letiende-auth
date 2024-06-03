import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';

export interface LangData {
  [key: string]: { [key: string]: string };
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
  private funcionesInit: boolean[] = [
    this.http.get('assets/lang/lang.json', { responseType: 'json' }).subscribe((interfaz$: any) => this.interfaz.next(interfaz$)).closed,
  ];
  public lang: string = 'es';
  public idioma: WritableSignal<string> = signal(this.lang);
  public iniciado: boolean = false;
  init(): Observable<boolean> {
    return new Observable((suscriptor: Subscriber<boolean>) => {
      this.funcionesInit.forEach((ejFunc: boolean) => suscriptor.next(ejFunc));
      suscriptor.complete();
      this.iniciado = true;
    });
  }
  getInterfaz(llave: string): string {
    return this.textos[llave][this.lang];
  }
}
