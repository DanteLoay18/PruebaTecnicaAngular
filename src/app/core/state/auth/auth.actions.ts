import { createAction, props } from '@ngrx/store';
import {  Usuario } from '../../../features/user';
import { LoginAuthRequest } from '../../../features/auth';


export const authLogin = createAction('[Auth] Login', props<{ credentials: LoginAuthRequest }>());
export const authLoginSuccess = createAction('[Auth] Login Success', props<{ user: Usuario; token: string }>());
export const authLoginFailure = createAction('[Auth] Login Failure',   props<{ error: string }>());

export const restoreSession = createAction('[Auth] Restore Session', props<{ token: string }>());
export const restoreSuccess = createAction('[Auth] Restore Success', props<{ user: Usuario; token: string }>());
export const restoreFailure = createAction('[Auth] Restore Failure');


export const authLogout = createAction('[Auth] Logout');

