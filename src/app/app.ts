import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { checkBackendHealth, selectBackendStatus } from './core';
import { CommonModule } from '@angular/common';
import { combineLatest, map, Subject, take, takeUntil, tap } from 'rxjs';
import { selectAppLoaded, selectHealthOk, selectIsAuthenticated } from './core/state';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private store = inject(Store);
  private router = inject(Router);
  private destroy$ = new Subject<void>();

  vm$ = combineLatest({
    loaded: this.store.select(selectAppLoaded),
    healthOk: this.store.select(selectHealthOk),
    isAuth: this.store.select(selectIsAuthenticated),
  }).pipe(

  );

  ngOnInit() {
    this.vm$.pipe(takeUntil(this.destroy$)).subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
