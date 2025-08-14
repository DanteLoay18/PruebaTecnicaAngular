import { Observable } from 'rxjs';
// import { LoginAuthRequest, AuthResponse, RegisterAuthRequest } from './auth.model';
import { Response } from '../../../core';
import { AuthResponse, RegisterAuthRequest } from '../../auth';

export abstract class UserRepository {
    
  abstract complementaryRegister(registerRequest: RegisterAuthRequest): Observable<Response<AuthResponse>>;

}
