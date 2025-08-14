import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from '../../../shared/components/side-bar/side-bar';
import { TopbarComponent } from '../../../shared/components/topbar/topbar';
import { NavItem } from '../../interfaces/nav-item.interface';
import { GetMenusUtils } from '../../utils/menu.utils';
import { ToastComponent } from '../../../shared/components/toast/toast';
import { Store } from '@ngrx/store';
import { selectUser } from '../../state';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  imports: [
    RouterOutlet, SideBarComponent, TopbarComponent, ToastComponent, CommonModule
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss'
})
export class MainLayoutComponent implements OnInit{
  
  collapsed = false;

  private store = inject(Store);

  user$ = this.store.select(selectUser);
  



  private allMenus: NavItem[] = GetMenusUtils;

  menus$ = this.user$.pipe(
    map(user => {
      const role = (user?.role || '').toUpperCase().trim();
      return this.allMenus.filter(menu => {
        const menuRoles = (menu.roles ?? []).map(r => r.toUpperCase().trim());
        // visible para todos si no define roles, o si el usuario está en la lista
        return menuRoles.length === 0 || menuRoles.includes(role)!;
      });
    })
  );


  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }

  ngOnInit(): void {

  }
  


}
