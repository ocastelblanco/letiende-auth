import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { DataService } from '@servicios/data.service';

type LogoColor = 'oscuro' | 'claro' | 'amarillo' | 'marron' | 'naranja' | 'verde';

interface LogoInfo {
  size: 'lg' | 'sm';
  color: boolean;
  borde: LogoColor | null;
  fondo: LogoColor;
  archivo: string;
}

@Component({
  selector: 'lta-logo',
  standalone: true,
  imports: [
    NgClass
  ],
  template: `
  @if (visible) {
    <div class="logo-cont"
        [ngClass]="genLogoClass()">
      <img [src]="ruta + logo.archivo"
          class="logo-img"
          [alt]="interfaz('img-logo-alt')">
    </div>
  }
  `,
  styleUrl: './logo.component.scss'

})
export class LogoComponent implements AfterViewInit {
  @Input() color: boolean = false;
  @Input() borde: boolean = false;
  @Input() relleno: boolean = false;
  @Input() fondo: LogoColor = 'claro';
  visible: boolean = false;
  logoAncho: number = 0;
  logos: LogoInfo[] = [
    { size: 'lg', color: false, fondo: 'claro', archivo: 'logo_negro.svg', borde: 'oscuro' },
    { size: 'lg', color: false, fondo: 'oscuro', archivo: 'logo_blanco.svg', borde: 'claro' },
    { size: 'lg', color: true, fondo: 'amarillo', archivo: 'logo_sobre_amarillo.svg', borde: 'verde' },
    { size: 'lg', color: true, fondo: 'marron', archivo: 'logo_sobre_marron.svg', borde: 'naranja' },
    { size: 'lg', color: true, fondo: 'naranja', archivo: 'logo_sobre_naranja.svg', borde: 'verde' },
    { size: 'lg', color: true, fondo: 'verde', archivo: 'logo_sobre_verde.svg', borde: 'amarillo' },
    { size: 'sm', color: false, fondo: 'claro', archivo: 'mono_negro.svg', borde: 'oscuro' },
    { size: 'sm', color: false, fondo: 'oscuro', archivo: 'mono_blanco.svg', borde: 'claro' },
    { size: 'sm', color: true, fondo: 'marron', archivo: 'mono_naranja.svg', borde: 'naranja' },
    { size: 'sm', color: true, fondo: 'naranja', archivo: 'mono_marron.svg', borde: 'marron' },
    { size: 'sm', color: true, fondo: 'verde', archivo: 'mono_amarillo.svg', borde: 'amarillo' },
    { size: 'sm', color: true, fondo: 'amarillo', archivo: 'mono_verde.svg', borde: 'verde' }
  ];
  ruta: string = 'assets/logos/';
  logo: LogoInfo = {} as LogoInfo;
  constructor(public data: DataService, private elRef: ElementRef) { }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.visible = true;
      const lc: HTMLElement = this.elRef.nativeElement;
      this.logoAncho = lc.offsetWidth;
      this.logo = this.logos.find((logo$: LogoInfo) =>
        logo$.size == this.genlogoAncho() && logo$.color == this.color && logo$.fondo == this.fondo
      ) ?? this.logos[0];
    }, 50);
  }
  interfaz(llave: string): string {
    return this.data.getInterfaz(llave);
  }
  genLogoClass(): string[] {
    const clases: string[] = [];
    clases.push(this.genlogoAncho());
    if (this.borde) {
      clases.push('borde');
      clases.push('borde-' + this.logo.borde);
    }
    if (this.relleno) {
      clases.push('fondo');
      clases.push('fondo-' + this.logo.fondo);
    }
    return clases;
  }
  genlogoAncho(): string {
    return this.logoAncho > 144 || this.logoAncho == 0 ? 'lg' : 'sm';
  }
}
