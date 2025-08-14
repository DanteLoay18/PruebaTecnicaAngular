import { Component, inject, signal } from '@angular/core';
import * as Health from '../../../../core/state/health/health.actions';
import * as AuthActions from '../../../../core/state/auth/auth.actions';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { distinctUntilChanged, filter, interval, Subject, takeUntil } from 'rxjs';
import { selectHealthOk } from '../../../../core';
import { TokenStorageService } from '../../../auth';
@Component({
  selector: 'app-maintenance',
  imports: [],
  templateUrl: './maintenance.html',
  styleUrl: './maintenance.scss'
})
export class Maintenance {
  private store = inject(Store);
  private router = inject(Router);
  private tokenStorage = inject(TokenStorageService);
  private destroy$ = new Subject<void>();

  // info$ = this.store.select(selectHealthInfo);
  ok$ = this.store.select(selectHealthOk);

  polling = signal(true); // puedes activar/desactivar

  ngOnInit(): void {
    // primera verificación
    this.store.dispatch(Health.checkBackendHealth());

    // si vuelve OK, salimos
    this.ok$
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        
         this.router.navigateByUrl('/maintenance')
      });

    // polling cada 10s
    interval(10_000).pipe(takeUntil(this.destroy$)).subscribe(() => {
      if (this.polling()) this.store.dispatch(Health.checkBackendHealth());
    });
  }

  retry() {
    this.store.dispatch(Health.checkBackendHealth());
  }

  togglePolling() {
    this.polling.set(!this.polling());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
