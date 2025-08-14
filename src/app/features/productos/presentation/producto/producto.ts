import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { Table } from '../../../../shared/components/table/table';
import { combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import * as RestaurantSelector from '../../../../core/state/productos/productos.selectors';
import { ProductActions } from '../../../../core/state/productos/productos.action';
import { Router } from '@angular/router';
import { Alerta } from '../../../../shared';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Categoria } from '../../../../core/models/categoria.model';

@Component({
  selector: 'app-restaurante',
  imports: [CommonModule, Table, Alerta, ReactiveFormsModule],
  templateUrl: './producto.html',
  styleUrl: './producto.scss'
})
export class Producto {

  private store = inject(Store);

  private router = inject(Router);
  private fb = inject(FormBuilder);
  showAlerta = false;
  mensaje = '';
  idEliminar = '';

  formBusqueda = this.fb.group({
    nombreProducto: [''],
    categoriaId: ['']
  })


  vm$ = combineLatest({
    rows: this.store.select(RestaurantSelector.selectRows),
    total: this.store.select(RestaurantSelector.selectTotal),
    loading: this.store.select(RestaurantSelector.selectLoading),
    page: this.store.select(RestaurantSelector.selectPage),
    pageSize: this.store.select(RestaurantSelector.selectPageSize),
    headers: this.store.select(RestaurantSelector.selectHeaders),
  });

  categorias$= this.store.select(RestaurantSelector.selectCategorias);


  ngOnInit() {
    this.store.dispatch(ProductActions.init());
    this.store.dispatch(ProductActions.getCategorias());
  }

  // onSearch(search: string) { this.store.dispatch(ProductActions.changeSearch({ search })); }
  onSort(sort: string, dir: 'asc' | 'desc') { this.store.dispatch(ProductActions.changeSort({ sort, dir })); }
  onPage(page: number) { this.store.dispatch(ProductActions.changePage({ page })); }
  onPageSize(pageSize: number) { this.store.dispatch(ProductActions.changePageSize({ pageSize })); }


  agregarRestaurante() {
    localStorage.removeItem(restauranteIdLocalStorageKey);

    this.router.navigateByUrl('/productos/register')
  }

  editar(id: string) {
    localStorage.setItem(restauranteIdLocalStorageKey, id);
    this.router.navigate(['/productos/edit',]);
    this.store.dispatch(ProductActions.clearForm());

  }

  showEliminar(id:string, nombre:string){
    this.showAlerta = true;
    this.mensaje = "Esta seguro que desea eliminar al producto : " + nombre + " ?";
    this.idEliminar = id;
  }


  eliminar(){
    this.store.dispatch(ProductActions.delete({id: this.idEliminar}));
    this.showAlerta = false;
  }

  closeAlerta(){
    this.showAlerta = false;
  }

  filtrar(){
    this.store.dispatch(ProductActions.changeSearch({ nombre: this.formBusqueda.value.nombreProducto ?? '', categoriaId : this.formBusqueda.value.categoriaId ?? ''}));
  }

  trackByCatId = (_: number, c: Categoria) => c.id;
  

}

export const restauranteIdLocalStorageKey = 'idProducto'