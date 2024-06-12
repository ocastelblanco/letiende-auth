import { Routes } from '@angular/router';
import { PedidosComponent } from '@apps/pedidos/pedidos.component';
import { MenuFichasComponent } from '@compartidos/menu-fichas.component';

export const routes: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  { path: 'menu', component: MenuFichasComponent },
  { path: 'app/pedidos', component: PedidosComponent }
];
