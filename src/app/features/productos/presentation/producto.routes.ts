import { Routes } from "@angular/router";
import { Producto } from "./producto/producto";
import { FormProducto,  } from "./form-producto/form-producto";

export const productoRoutes: Routes = [
  {
    path: '',
    component: Producto,
  },
  {
    path: 'register',
    component: FormProducto,
  },
  {
    path: 'edit',
    component: FormProducto,
  },
  //  {
  //   path: 'register',
  //   component: Register,
  // }
];
