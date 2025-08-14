import { Component, inject } from '@angular/core';
import { ToastService } from '../../../core/services/toast.service';
import { Toast } from '../../../core/models/toast.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrl: './toast.scss'
})
export class ToastComponent {
   svc = inject(ToastService);
  trackById = (_: number, t: Toast) => t.id;

  // Fondo muy claro + borde del mismo color (paleta clásica)
  containerClass(type: Toast['type']) {
    switch (type) {
      case 'success': return ['bg-green-50',  'border-green-300'];
      case 'error':   return ['bg-red-50',    'border-red-300'];
      case 'info':    return ['bg-blue-50',   'border-blue-300'];
      case 'warning': return ['bg-yellow-50', 'border-yellow-300'];
      default:        return ['bg-gray-50',   'border-gray-300'];
    }
  }

  iconCircleClass(type: Toast['type']) {
    switch (type) {
      case 'success': return ['bg-green-600'];
      case 'error':   return ['bg-red-600'];
      case 'info':    return ['bg-blue-600'];
      case 'warning': return ['bg-yellow-500', 'text-black']; // blanco también funciona
      default:        return ['bg-gray-600'];
    }
  }
}
