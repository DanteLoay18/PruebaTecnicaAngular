import { createFeatureSelector, createSelector } from '@ngrx/store';
import { healthFeatureKey, HealthState, HealthStatuses } from './health.reducer';

export const selectHealthState = createFeatureSelector<HealthState>(healthFeatureKey);

export const selectBackendStatus = createSelector(
  selectHealthState,
  (state) => state.status
);

export const selectHealthLoaded = createSelector(selectHealthState, s => s.status != HealthStatuses.UNKNOWN);
export const selectHealthOk     = createSelector(selectHealthState, s => s.status == HealthStatuses.ONLINE);