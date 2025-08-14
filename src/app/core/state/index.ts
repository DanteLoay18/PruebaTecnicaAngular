import { createSelector } from '@ngrx/store';
import { selectHealthLoaded, selectHealthOk } from './health/index';
import { selectAuthLoaded } from './auth/index';

export * from './auth/index';
export * from './health/index';


export const selectAppLoaded = createSelector(
  selectAuthLoaded, selectHealthLoaded,
  (aLoaded, hLoaded) => aLoaded && hLoaded
);
export const selectAppReady = createSelector(
  selectAppLoaded, selectHealthOk,
  (loaded, healthOk) => loaded && healthOk
);