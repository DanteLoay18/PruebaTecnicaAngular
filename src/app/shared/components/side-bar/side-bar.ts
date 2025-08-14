import { CommonModule, NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavItem } from '../../../core/interfaces/nav-item.interface';

@Component({
  selector: 'app-side-bar',
  imports: [RouterLink, RouterLinkActive, CommonModule, NgClass],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.scss'
})
export class SideBarComponent {
  @Input() collapsed = false;
  @Output() toggle = new EventEmitter<void>();
  @Input() items: NavItem[] = [];
}
