// shared/models/nav-item.ts
export interface NavItem {
  label: string;
  icon: string;              
  link: string | string[];   
  exact?: boolean;           
  pill?: boolean;            
}
