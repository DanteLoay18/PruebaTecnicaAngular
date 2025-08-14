import { CommonModule } from '@angular/common';
import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { SortDir, TableHeader } from '../../../core/models';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  imports: [CommonModule, FormsModule],
  templateUrl: './table.html',
  styleUrl: './table.scss'
})
export class Table {
  @Input({required: true}) headers: TableHeader[] = [];

  // Datos y estado que VIENEN del padre (server-side)
  @Input() rows: any[] = [];
  @Input() total = 0;
  @Input() pageIndex = 1;              // 1-based
  @Input() pageSize = 10;
  @Input() sortKey?: string;
  @Input() sortDir: SortDir = 'asc';
  @Input() loading = false;
  @Input() pageSizeOptions = [10, 20, 30, 50];
  @Input() trackBy: (index: number, row: any) => any = (i, r) => r?.id ?? i;

  // Eventos para que el padre haga la petición HTTP
  @Output() sortChange = new EventEmitter<{ key?: string; dir: SortDir }>();
  @Output() pageChange = new EventEmitter<number>();         // nuevo pageIndex
  @Output() pageSizeChange = new EventEmitter<number>();     // nuevo pageSize

  @ContentChild(TemplateRef) rowTpl!: TemplateRef<any>;      // <ng-template let-row>…</ng-template>

  get totalPages() {
    return Math.max(1, Math.ceil(this.total / Math.max(1, this.pageSize)));
  }

  onHeaderClick(i: number, h: TableHeader) {
    if (!h.sortable) return;
    const nextDir: SortDir = (this.sortKey === h.key && this.sortDir === 'asc') ? 'desc' : 'asc';
    this.sortKey = h.key;
    this.sortDir = nextDir;
    this.sortChange.emit({ key: this.sortKey, dir: nextDir });
  }

  goTo(p: number) {
    const np = Math.min(Math.max(1, p), this.totalPages);
    if (np !== this.pageIndex) this.pageChange.emit(np);
  }

  onPageSize(size: number) {
    if (size !== this.pageSize) this.pageSizeChange.emit(+size);
  }
}
