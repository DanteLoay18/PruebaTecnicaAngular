import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { filter, finalize, of, switchMap, take } from 'rxjs';
import { RestauranteFacade } from '../../application/restaurante.facade';
import { Store } from '@ngrx/store';
import { RestaurantsActions } from '../../../../core/state/restaurantes/restaurants.action';
import * as RestaurantSelector from '../../../../core/state/restaurantes/restaurants.selectors';
import { restauranteIdLocalStorageKey } from '../restaurante/restaurante';

@Component({
  selector: 'app-form-restaurante',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-restaurante.html',
  styleUrl: './form-restaurante.scss'
})
export class FormRestaurante implements OnInit {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private store = inject(Store);
  // private api = inject(RestauranteFacade);
  isSaving$ = this.store.select(RestaurantSelector.selectIsSaving);
  isLoadingForm$ = this.store.select(RestaurantSelector.selectIsLoadingForm);
  formEntity$ = this.store.select(RestaurantSelector.selectForm);
  // Modo
  isEdit = false;
  private id: string | null = null;

  saving = false;
  logoPreview: string | null = null;
  private logoFile: File | null = null;
  readonly MAX_IMAGE_MB = 2;

  form = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(80)]],
    descripcion: ['', [Validators.required, Validators.maxLength(200)]],
    tiempoEntrega: [null, [Validators.required, Validators.min(0)]],

    activo: [false], 
  });

  ngOnInit(): void {
    this.id = localStorage.getItem(restauranteIdLocalStorageKey);
    this.isEdit = !!this.id;

    console.log(this.isEdit)

    if (this.isEdit && this.id) {
      this.store.dispatch(RestaurantsActions.getOne({ id: this.id }));

      this.formEntity$
        .pipe(filter(Boolean), take(1))
        .subscribe((r: any) => {
          console.log(r);
          this.form.patchValue({
            nombre: r.nombre,
            descripcion: r.descripcion,
            tiempoEntrega: r.tiempoEntrega,
            activo: r.activo
          });
          this.logoPreview = r.logoUrl ?? null;
        });
    } else {
      // nuevo: limpia el form en el store
      this.store.dispatch(RestaurantsActions.clearForm());
    }
  }


  cancelar() { this.router.navigate(['/restaurantes']); }

  guardar() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    // this.saving = true;

    const v = this.form.value;
    const fd = new FormData();

    // ⚠️ Usa los NOMBRES EXACTOS que espera el backend
    fd.append('nombre', v.nombre!);
    fd.append('descripcion', v.descripcion ?? '');
    if (v.tiempoEntrega != null) fd.append('TiempoEntrega', String(v.tiempoEntrega));
    if (this.logoFile) fd.append('foto', this.logoFile, this.logoFile.name);

    if (this.isEdit && this.id) {
      fd.append('id', this.id);
      fd.append('activo', `${v.activo}`);
      fd.append('isUpdateImagen', `false`)
      this.store.dispatch(RestaurantsActions.update({  formData: fd }));
    } else {
      this.store.dispatch(RestaurantsActions.create({ formData: fd }));
    }


  }

  onFileChange(ev: Event) {
    const input = ev.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { alert('El archivo debe ser una imagen.'); input.value = ''; return; }
    if (file.size > this.MAX_IMAGE_MB * 1024 * 1024) { alert(`Máximo ${this.MAX_IMAGE_MB} MB.`); input.value = ''; return; }
    this.logoFile = file;

    const reader = new FileReader();
    reader.onload = () => this.logoPreview = String(reader.result);
    reader.readAsDataURL(file);
  }

  quitarLogo() { this.logoFile = null; this.logoPreview = null; }
}