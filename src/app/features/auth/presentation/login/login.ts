import { CommonModule } from '@angular/common';
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthFacade } from '../../application';
import { LoginAuthRequest } from '../..';
import { Store } from '@ngrx/store';
import { authLogin, selectAuthError, selectIsAuthenticated, selectLoading } from '../../../../core';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  encapsulation: ViewEncapsulation.None
})
export class Login {

  private fb = inject(FormBuilder);
  private store = inject(Store);


  showPassword = false;

  readonly loading = this.store.selectSignal(selectLoading);
  readonly error = this.store.selectSignal(selectAuthError);
  readonly isAuthenticated = this.store.selectSignal(selectIsAuthenticated);

  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  login() {
    if (!this.form.valid) {

      this.form.markAllAsTouched();
      return;
    }

    const loginRequest: LoginAuthRequest = {
      username: this.form.value.email,
      password: this.form.value.password,
    }

    this.store.dispatch(authLogin({ credentials: loginRequest }));

  }


  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
