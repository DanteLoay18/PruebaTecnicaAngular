import { Routes } from "@angular/router";
import { Restaurante } from "./restaurante/restaurante";
import { FormRestaurante } from "./form-restaurante/form-restaurante";

export const restauranteRoutes: Routes = [
  {
    path: '',
    component: Restaurante,
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
