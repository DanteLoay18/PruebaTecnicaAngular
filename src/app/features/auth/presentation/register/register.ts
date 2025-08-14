import { CommonModule } from '@angular/common';
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthFacade } from '../../application/auth.facade';
import { TipoUsuarioConstants } from '../../../../core';
import { catchError, throwError } from 'rxjs';
import { RegisterAuthRequest } from '../../domain';
@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
  ],
  encapsulation: ViewEncapsulation.None,

  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {

  private fb = inject(FormBuilder);
  private authFacade = inject(AuthFacade);
  private router = inject(Router);

  showPassword = false;
  showConfirmedPassword = false;

  showError = false;
  errorMessage = '';
  alertType: 'error' | 'success' | 'info' | 'warning' = 'error';



  form = this.fb.nonNullable.group({
    // nombre: ['', Validators.required],
    // apellido: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
    role: ['', Validators.required]
  }, {
    validators: this.passwordsMatchValidator
  });

  passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  register() {
    if (this.form.valid) {

      const registerRequest: RegisterAuthRequest = {
        username: this.form.value.email ?? '',
        password: this.form.value.password ?? '',
        role: this.form.value.role ?? ''
      }

      this.authFacade.register(registerRequest)
        .pipe(
          catchError((err) => {
            const { error } = err;
            console.error('Error capturado en pipe:', error.message);

            this.mostrarAlerta('error', error.message);

            // aquí puedes hacer algo con el error
            return throwError(() => err); // volver a lanzar si es necesario
          })
        )
        .subscribe((resp) => {


          this.mostrarAlerta('success', resp.message);

        })
    } else {
      this.form.markAllAsTouched();
    }
  }

 

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmedPassword = !this.showConfirmedPassword;
  }

  mostrarAlerta(tipo: 'error' | 'success' | 'info' | 'warning', mensaje: string) {
    this.alertType = tipo;
    this.errorMessage = mensaje;
    this.showError = true;
  }

  closeAlerta(){
    this.showError = false;

    if(this.alertType === 'success'){
      
      this.router.navigate(['/usuario/registro-extra'])

      

    }
  }
}
