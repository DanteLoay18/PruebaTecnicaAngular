import { Routes } from "@angular/router";
import { Producto } from "./producto/producto";
import { FormRestaurante } from "./form-producto/form-restaurante";

export const restauranteRoutes: Routes = [
  {
    path: '',
    component: Producto,
  },
  {
    path: 'register',
    component: FormRestaurante,
  },
  {
    path: 'edit',
    component: FormRestaurante,
  },
  //  {
  //   path: 'register',
  //   component: Register,
  // }
];
