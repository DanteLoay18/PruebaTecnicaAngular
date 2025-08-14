import { createReducer, on } from '@ngrx/store';
import * as HealthActions from './health.actions';

export const enum HealthStatuses {
  ONLINE = 'online',
  OFFLINE = 'offline',
  UNKNOWN = 'unknown',
}

export interface HealthState {
  status: HealthStatuses;
}

export const initialHealthState: HealthState = {
  status: HealthStatuses.UNKNOWN,
};

export const healthFeatureKey = 'health';

export const healthReducer = createReducer(
  initialHealthState,
  on(HealthActions.backendOnline, (state) => ({ ...state, status: HealthStatuses.ONLINE })),
  on(HealthActions.backendOffline, (state) => ({ ...state, status: HealthStatuses.OFFLINE }))
);
