import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';

export interface LangData {
  [key: string]: { [key: string]: string };
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }
  public interfaz: BehaviorSubject<LangData | null> = new BehaviorSubject<LangData | null>(null);
  private funcionesInit: boolean[] = [
    this.http.get('assets/lang/lang.json', { responseType: 'json' }).subscribe((interfaz$: any) => this.interfaz.next(interfaz$)).closed,
  ];
  public idioma: WritableSignal<string> = signal('es');
  init(): Observable<boolean> {
    return new Observable((suscriptor: Subscriber<boolean>) => {
      this.funcionesInit.forEach((ejFunc: boolean) => suscriptor.next(ejFunc));
      suscriptor.complete();
    });
  }
}
