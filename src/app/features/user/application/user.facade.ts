import { Injectable, inject } from '@angular/core';
// import { AuthRepository } from '../domain/auth.repository';
import { Observable } from 'rxjs';
import { UserRepository } from '../domain/user.repository';
import { AuthResponse, RegisterAuthRequest } from '../../auth';
import { Response } from '../../../core';

@Injectable({ providedIn: 'root' })
export class UserFacade {
  private authRepo = inject(UserRepository);

  complementaryRegister(registerRequest: RegisterAuthRequest): Observable<Response<AuthResponse>> {
    return this.authRepo.complementaryRegister(registerRequest);
  }

}
