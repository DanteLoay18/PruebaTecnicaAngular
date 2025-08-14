import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro-extra',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './registro-extra.html',
  styleUrl: './registro-extra.scss'
})
export class RegistroExtra {
  private fb = inject(FormBuilder);

  currentStep = signal(1);
  totalSteps = 2;

  codeSent = signal(false);
  codeValidated = signal(false);
  codeControls = Array(6).fill(null).map((_, i) => `code${i}`);

  // Paso 1 - Verificación de email
  step1Form = this.fb.group(
    this.codeControls.reduce((acc, key) => {
      acc[key] = new FormControl('', [Validators.required, Validators.pattern(/^\d$/)]);
      return acc;
    }, {} as Record<string, FormControl>)
  );

  step2Form: FormGroup = this.fb.group({
    companyName: ['', Validators.required],
    ruc: ['', Validators.required],
    address: [''],
    document: [null]
  });


  sendCode() {
    if (this.step1Form.get('email')?.valid) {
      console.log('✅ Código enviado a:', this.step1Form.get('email')?.value);
      this.codeSent.set(true);
    }
  }

  validateCode() {
    const code = this.step1Form.get('verificationCode')?.value;
    if (code === '123456') {
      this.codeValidated.set(true);
      this.nextStep();
    } else {
      alert('Código incorrecto');
    }
  }

  resendCode(): void {
    const email = '[correo_actual_del_usuario]'; // puedes tenerlo desde login o authService
    console.log(`📨 Reenviando código a ${email}`);
    alert('Código reenviado al correo registrado');
  }

  skipStep(): void {
    this.nextStep();
  }

  nextStep() {
    if (this.currentStep() < this.totalSteps) {
      this.currentStep.update((step) => step + 1);
    }
  }

  prevStep() {
    if (this.currentStep() > 1) {
      this.currentStep.update((step) => step - 1);
    }
  }

  submit(): void {
    if (this.step2Form.valid) {
      alert('Registro completado con éxito');
    } else {
      alert('⚠️ Completa todos los campos obligatorios');
    }
  }

  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      this.step2Form.patchValue({ document: file });
    }
  }

  onOtpInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (value.length > 1 && value.length === this.codeControls.length) {

      value.split('').forEach((char, i) => {
        if (/^\d$/.test(char)) {
          this.step1Form.controls['code' + i].setValue(char);
        }
      });

      const otpInputs = document.querySelectorAll<HTMLInputElement>('input.otp-input');
      const lastInput = otpInputs[this.codeControls.length - 1];
      if (lastInput) lastInput.focus();
      return;
    }

    // Asegurarse de que solo se acepten dígitos y reemplazar el valor anterior
    if (/^\d$/.test(value)) {
      this.step1Form.controls['code' + index].setValue(value);
      const nextInput = document.querySelectorAll<HTMLInputElement>('input')[index + 1];
      if (nextInput) nextInput.focus();
    } else {
      input.value = '';
      this.step1Form.controls['code' + index].setValue('');
    }
  }

  onKeyDown(event: KeyboardEvent, index: number): void {
    const input = event.target as HTMLInputElement;

    if (event.key === 'Backspace' && !input.value) {
      const prevInput = document.querySelectorAll<HTMLInputElement>('input')[index - 1];
      if (prevInput) prevInput.focus();
    }
  }

  onOtpPaste(event: ClipboardEvent): void {
    event.preventDefault(); // evita que Angular maneje el paste por defecto
    const pastedText = event.clipboardData?.getData('text') || '';

    const digits = pastedText.trim().slice(0, 6).split('');

    digits.forEach((digit, i) => {
      if (/^\d$/.test(digit)) {
        this.step1Form.controls['code' + i].setValue(digit);
      }
    });

    // Focus en el último campo que recibió un dígito
    const otpInputs = document.querySelectorAll<HTMLInputElement>('input.otp-input');
    const lastIndex = digits.length - 1;
    if (otpInputs[lastIndex]) {
      otpInputs[lastIndex].focus();
    }
  }



}
