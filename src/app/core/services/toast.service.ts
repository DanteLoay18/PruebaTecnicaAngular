// toast.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Toast } from '../models/toast.model';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  toasts$ = this.toastsSubject.asObservable();

  private timers = new Map<string, any>();

  show(partial: Omit<Toast, 'id'>) {
    const id = this.uuid();
    const toast: Toast = { id, duration: 5000, ...partial };
    const items = [toast, ...this.toastsSubject.value];
    this.toastsSubject.next(items);

    const timer = setTimeout(() => this.remove(id), toast.duration);
    this.timers.set(id, timer);
    return id;
  }

  success(message: string, title = 'Éxito', duration = 5000) {
    return this.show({ type: 'success', message, title, duration });
  }
  error(message: string, title = 'Error', duration = 5000) {
    return this.show({ type: 'error', message, title, duration });
  }
  info(message: string, title = 'Info', duration = 5000) {
    return this.show({ type: 'info', message, title, duration });
  }
  warning(message: string, title = 'Atención', duration = 5000) {
    return this.show({ type: 'warning', message, title, duration });
  }

  remove(id: string) {
    const timer = this.timers.get(id);
    if (timer) { clearTimeout(timer); this.timers.delete(id); }
    this.toastsSubject.next(this.toastsSubject.value.filter(t => t.id !== id));
  }

  clear() {
    this.timers.forEach(t => clearTimeout(t));
    this.timers.clear();
    this.toastsSubject.next([]);
  }

  private uuid() {
    return (globalThis.crypto?.randomUUID?.() ??
      `t_${Date.now()}_${Math.random().toString(16).slice(2)}`);
  }
}
