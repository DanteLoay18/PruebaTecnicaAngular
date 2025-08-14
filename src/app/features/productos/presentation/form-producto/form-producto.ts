import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { filter, finalize, of, switchMap, take } from 'rxjs';
import { RestauranteFacade } from '../../application/producto.facade';
import { Store } from '@ngrx/store';
import { ProductActions } from '../../../../core/state/productos/productos.action';
import * as RestaurantSelector from '../../../../core/state/productos/productos.selectors';
import { restauranteIdLocalStorageKey } from '../producto/producto';
import { Categoria } from '../../../../core/models/categoria.model';
import { CreateProductoRequest, UpdateProductoRequest } from '../../domain/producto.model';

@Component({
  selector: 'app-form-producto',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-producto.html',
  styleUrl: './form-producto.scss'
})
export class FormProducto implements OnInit {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private store = inject(Store);
  // private api = inject(RestauranteFacade);
  isSaving$ = this.store.select(RestaurantSelector.selectIsSaving);
  isLoadingForm$ = this.store.select(RestaurantSelector.selectIsLoadingForm);
  formEntity$ = this.store.select(RestaurantSelector.selectForm);
  categorias$ = this.store.select(RestaurantSelector.selectCategorias);
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
    precio: [0, [
      Validators.required,
      Validators.min(0),
      Validators.pattern(/^\d+(\.\d{1,2})?$/) // 2 decimales como máximo
    ]],
    cantidad: [null, [Validators.required, Validators.min(0), Validators.pattern(/^\d+$/)]],
    categoriaId: ['', [Validators.required]],

    activo: [false],
  });

  ngOnInit(): void {
    this.store.dispatch(ProductActions.getCategorias());

    this.id = localStorage.getItem(restauranteIdLocalStorageKey);
    this.isEdit = !!this.id;


    if (this.isEdit && this.id) {
      this.store.dispatch(ProductActions.getOne({ id: this.id }));

      this.formEntity$
        .pipe(filter(Boolean), take(1))
        .subscribe((r: any) => {
          this.form.patchValue({
            nombre: r.nombre,
            descripcion: r.descripcion,
            precio: parseFloat(r.precio),
            activo: r.activo,
            cantidad: r.cantidad,
            categoriaId: r.categoriaId
          });
          this.logoPreview = r.logoUrl ?? null;
        });
    } else {
      // nuevo: limpia el form en el store
      this.store.dispatch(ProductActions.clearForm());
    }
  }


  cancelar() { this.router.navigate(['/restaurantes']); }

  guardar() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }

    const v = this.form.value;

    if (this.isEdit && this.id) {
      const request: UpdateProductoRequest = {
        id: this.id,
        nombre: v.nombre!,
        descripcion: v.descripcion!,
        cantidad: v.cantidad!,
        precio: v.precio!,
        categoriaId: v.categoriaId!,

      }
      this.store.dispatch(ProductActions.update({ request }));
    } else {
      const request: CreateProductoRequest = {
        nombre: v.nombre!,
        descripcion: v.descripcion!,
        cantidad: v.cantidad!,
        precio: v.precio!,
        categoriaId: v.categoriaId!,

      }
      this.store.dispatch(ProductActions.create({ request }));
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



  trackByCatId = (_: number, c: Categoria) => c.id;
}