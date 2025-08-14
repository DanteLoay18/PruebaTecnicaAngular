import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import * as HealthActions from './health.actions';
import { catchError, concatMap, filter, fromEvent, map, merge, of, startWith, switchMap, takeUntil, timer } from 'rxjs';
import { HealthService } from '../../services';
import { Router } from '@angular/router';

@Injectable()
export class HealthEffects implements OnInitEffects {
   private actions$ = inject(Actions);
   private healthService = inject(HealthService);
   private router= inject(Router);
   private POLL_MS = 30_000;


   ngrxOnInitEffects() {
    return HealthActions.startHealthPolling();
  }

  private visible$ = fromEvent(document, 'visibilitychange').pipe(
    startWith(0),
    map(() => !document.hidden)
  );
  
  checkBackend$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HealthActions.checkBackendHealth),
      switchMap(() =>
        this.healthService.checkHealth().pipe(
          map(() => HealthActions.backendOnline()),
          catchError(() => of(HealthActions.backendOffline()))
        )
      )
    )
  );

   pollHealth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HealthActions.startHealthPolling),
      switchMap(() => {
        const tick$ = timer(0, this.POLL_MS);
        const manual$ = this.actions$.pipe(ofType(HealthActions.checkBackendHealth));
        const source$ = merge(tick$, manual$);

        return this.visible$.pipe(
          // solo emitir cuando la pestaña esté visible
          filter(Boolean),
          switchMap(() =>
            source$.pipe(
              concatMap(() =>
                this.healthService.checkHealth().pipe(
                  map(() => HealthActions.backendOnline()),
                  catchError(() => {
                    this.router.navigateByUrl('/maintenance');
                    return of(HealthActions.backendOffline())
                  })
                )
              ),
              takeUntil(this.actions$.pipe(ofType(HealthActions.stopHealthPolling)))
            )
          )
        );
      })
    )
  );

}



