// src/app/pages/low-stock-report/low-stock-report.component.ts
import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule, CurrencyPipe, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import dayjs from 'dayjs';
import { ProductoLowStock, ReportsService } from '../../service/reportes.service';

@Component({
  selector: 'app-low-stock-report',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe],
  templateUrl: `./reportes.html`,
})
export class LowStockReportComponent {
  private reports = inject(ReportsService);

  loading = signal(false);
  threshold = signal(5);
  data = signal<ProductoLowStock[]>([]);

  hasData = computed(() => (this.data()?.length ?? 0) > 0);

  ngOnInit(){
    this.cargar();
  }

  cargar() {
    this.loading.set(true);
    this.reports.getLowStock().subscribe({
      next: (res) => {
        this.data.set(res ?? []);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        alert('No se pudo cargar el reporte.');
      },
    });
  }

  generarPDF() {
    const items = this.data();
    if (!items || items.length === 0) {
      alert('No hay datos para exportar.');
      return;
    }

    // console.log(items);

    const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
    const margin = 40;

    // Encabezado
    doc.setFontSize(14);
    doc.text('Reporte: Productos con Inventario Bajo', margin, 50);
    doc.setFontSize(10);
    doc.text(`Generado: ${dayjs().format('DD/MM/YYYY HH:mm')}`, margin, 66);

    // Tabla
    const head = [['#', 'Código', 'Producto', 'Categoría', 'Precio', 'Stock', 'Estado']];
    let stockMinimo = 5;
    const body: RowInput[] = items.map((p, i) => [
      i + 1,
      ( p.id ?? '').toString(),
      p.nombre ?? '',
      p.categoriaId ?? '',
      p.precio != null ? this.formatMoney(parseFloat(p.precio)) : '-',
      p.cantidad?.toString() ?? '',
      p.cantidad <= (stockMinimo ) ? 'BAJO' : 'OK',
    ]);

    autoTable(doc, {
      head,
      body,
      startY: 100,
      styles: { fontSize: 9, cellPadding: 4, overflow: 'linebreak' },
      headStyles: { fillColor: [33, 150, 243], textColor: 255 },
      columnStyles: {
        0: { halign: 'right', cellWidth: 28 },
        1: { cellWidth: 70 },
        2: { cellWidth: 170 },
        3: { cellWidth: 90 },
        4: { halign: 'right', cellWidth: 70 },
        5: { halign: 'right', cellWidth: 50 },
        6: { halign: 'right', cellWidth: 55 },
        7: { halign: 'center', cellWidth: 55 },
      },
      didDrawPage: (data) => {
        // Footer
        const pageSize = doc.internal.pageSize;
        const pageHeight = pageSize.getHeight();
        const pageWidth = pageSize.getWidth();
        doc.setFontSize(9);
        doc.text(`Total ítems: ${items.length}`, margin, pageHeight - 15);
        doc.text(`Página ${doc.getNumberOfPages()}`, pageWidth - margin, pageHeight - 15, { align: 'right' });
      },
    });

    doc.save(`reporte-inventario-bajo_${dayjs().format('YYYYMMDD_HHmm')}.pdf`);
  }

  private formatMoney(v: number) {
    return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(v);
  }
}
