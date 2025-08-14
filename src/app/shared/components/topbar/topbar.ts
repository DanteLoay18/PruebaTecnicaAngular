import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, inject, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../core';
import * as AuthActions from '../../../core/state/auth/auth.actions';

@Component({
  selector: 'app-topbar',
  imports: [CommonModule],
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss'
})
export class TopbarComponent {
  private store = inject(Store);
  
  @Output() menuClick = new EventEmitter<void>();
  isUserMenuOpen = false;

  user$ = this.store.select(selectUser);

  toggleUserMenu(event: MouseEvent) {
    event.stopPropagation();
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  // Cierra el dropdown al hacer clic fuera
  @HostListener('document:click')
  onDocClick() {
    if (this.isUserMenuOpen) this.isUserMenuOpen = false;
  }

  // Cierra con ESC
  @HostListener('document:keydown.escape')
  onEsc() {
    if (this.isUserMenuOpen) this.isUserMenuOpen = false;
  }

  goToProfile() { /* navega a /perfil */ }
  goToSettings() { /* navega a /configuracion */ }
  logout() { 

    this.store.dispatch(AuthActions.authLogout());
   }
}
