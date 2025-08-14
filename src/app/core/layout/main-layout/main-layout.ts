import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from '../../../shared/components/side-bar/side-bar';
import { TopbarComponent } from '../../../shared/components/topbar/topbar';
import { NavItem } from '../../interfaces/nav-item.interface';
import { GetMenusUtils } from '../../utils/menu.utils';
import { ToastComponent } from '../../../shared/components/toast/toast';

@Component({
  selector: 'app-main-layout',
  imports: [
    RouterOutlet, SideBarComponent, TopbarComponent, ToastComponent
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss'
})
export class MainLayoutComponent {
  collapsed = false;

  menus: NavItem[] = GetMenusUtils;

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }


}
