import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { Table } from '../../../../shared/components/table/table';
import { combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import * as RestaurantSelector from '../../../../core/state/restaurantes/restaurants.selectors';
import { RestaurantsActions } from '../../../../core/state/restaurantes/restaurants.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurante',
  imports: [CommonModule, Table],
  templateUrl: './restaurante.html',
  styleUrl: './restaurante.scss'
})
export class Restaurante {

  private store = inject(Store);

  private router = inject(Router);


  vm$ = combineLatest({
    rows: this.store.select(RestaurantSelector.selectRows),
    total: this.store.select(RestaurantSelector.selectTotal),
    loading: this.store.select(RestaurantSelector.selectLoading),
    page: this.store.select(RestaurantSelector.selectPage),
    pageSize: this.store.select(RestaurantSelector.selectPageSize),
    sort: this.store.select(RestaurantSelector.selectSort),
    dir: this.store.select(RestaurantSelector.selectDir),
    headers: this.store.select(RestaurantSelector.selectHeaders),
  });


  ngOnInit() {
    this.store.dispatch(RestaurantsActions.init());
  }

  onSearch(search: string) { this.store.dispatch(RestaurantsActions.changeSearch({ search })); }
  onSort(sort: string, dir: 'asc' | 'desc') { this.store.dispatch(RestaurantsActions.changeSort({ sort, dir })); }
  onPage(page: number) { this.store.dispatch(RestaurantsActions.changePage({ page })); }
  onPageSize(pageSize: number) { this.store.dispatch(RestaurantsActions.changePageSize({ pageSize })); }


  agregarRestaurante() {
    localStorage.removeItem(restauranteIdLocalStorageKey);

    this.router.navigateByUrl('/restaurantes/register')
  }

  editar(id: string) {
    localStorage.setItem(restauranteIdLocalStorageKey, id);
    this.router.navigate(['/restaurantes/edit',]);
  }

}

export const restauranteIdLocalStorageKey = 'idRestaurante'