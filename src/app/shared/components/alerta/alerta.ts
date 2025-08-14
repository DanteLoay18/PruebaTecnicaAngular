import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alerta-modal',
  imports: [
    CommonModule
  ],
  templateUrl: './alerta.html',
  styleUrl: './alerta.scss'
})
export class Alerta {
  @Input() message = 'Ha ocurrido un error inesperado.';
  @Input() type: 'error' | 'success' | 'warning' | 'info' = 'error';
  @Input() visible = false;
  @Input() btnAceptarVisible = false;
  @Output() close = new EventEmitter<void>();
  @Output() eliminar = new EventEmitter<void>();

  readonly ICON_MAP: Record<string, string> = {
    info: 'fa-solid fa-circle-info text-blue-600  rounded-full p-2',
    success: 'fa-solid fa-circle-check text-green-600  rounded-full p-2',
    error: 'fa-solid fa-circle-xmark text-red-600 rounded-full p-2',
    warning: 'fa-solid fa-triangle-exclamation text-yellow-600  rounded-full p-2',
  };


  iconClass = '';

  ngOnChanges(): void {
    this.iconClass = this.ICON_MAP[this.type] ?? this.ICON_MAP['info'];
  }

  get title(): string {
    switch (this.type) {
      case 'success': return 'Exito';
      case 'warning': return 'Advertencia';
      case 'info': return 'Informacion';
      case 'error': return 'Error';
      default: return 'M12 9v2m0 4h.01 M12 3a9 9 0 100 18 9 9 0 000-18z';
    }
  }

  get extraBgClass(){
     switch (this.type) {
      case 'success': return 'bg-green-100';
      case 'warning': return 'bg-yellow-100';
      case 'info': return 'bg-blue-100';
      case 'error': return 'bg-red-200';
      default: return 'M12 9v2m0 4h.01 M12 3a9 9 0 100 18 9 9 0 000-18z';
    }
  }
}
