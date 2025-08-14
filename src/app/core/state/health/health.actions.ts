import { createAction } from '@ngrx/store';



export const checkBackendHealth = createAction('[Health] Check Backend');
export const backendOnline = createAction('[Health] Backend Online');
export const backendOffline = createAction('[Health] Backend Offline');

export const startHealthPolling   = createAction('[Health] Start Polling');
export const stopHealthPolling    = createAction('[Health] Stop Polling');