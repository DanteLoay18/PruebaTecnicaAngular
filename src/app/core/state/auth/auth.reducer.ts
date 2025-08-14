import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { Usuario } from '../../../features/user';

export interface AuthState {
  user: Usuario | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  loaded: boolean;
  restoring: boolean
}

export const initialAuthState: AuthState = {
  user: null,
  token: null,
  loading: true,
  error: null,
  isAuthenticated: false,
  loaded: false,
  restoring: false,
};

export const authFeatureKey = 'auth';


export const authReducer = createReducer(
  initialAuthState,

  on(AuthActions.authLogin, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(AuthActions.authLoginSuccess, (state, { user, token }) => ({
    ...state,
    user,
    token,
    isAuthenticated: true,
    loading: false,
    loaded: true

  })),

  on(AuthActions.authLoginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    isAuthenticated: false,
    loaded: true

  })),
  on(AuthActions.restoreSession, (state) => ({
    ...state,
    loading: true,
    error: null,
    loaded: false,
    restoring: true
  })),
  on(AuthActions.restoreSuccess, (state, { user, token }) => ({
    ...state,
    user,
    token,
    isAuthenticated: true,
    loading: false,
    loaded: true,
    restoring: false,

  })),
  on(AuthActions.restoreFailure, (state) => ({
    ...state,
    loading: false,
    isAuthenticated: false,
    loaded: true,
    restoring: false,


  })),
  on(AuthActions.authLogout, () => ({
    ...initialAuthState
  }))
);
