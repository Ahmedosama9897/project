import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-comparison',
  standalone: true,
  imports: [NgClass],
  templateUrl: './comparison.component.html',
  styleUrl: './comparison.component.css'
})
export class ComparisonComponent {

  // قائمة المنتجات المتاحة للمقارنة
  product1 = { id: 1, name: 'منتج 1', price: '100 جنيه', description: 'وصف المنتج 1' };
  product2 = { id: 2, name: 'منتج 2', price: '200 جنيه', description: 'وصف المنتج 2' };
  product3 = { id: 3, name: 'منتج 3', price: '300 جنيه', description: 'وصف المنتج 3' };

  // المنتجات التي سيتم مقارنتها
  comparisonProducts: any[] = [];

  // دالة لإضافة المنتج إلى المقارنة
  addToComparison(product: any) {
    if (!this.comparisonProducts.some(item => item.id === product.id)) {
      this.comparisonProducts.push(product);
    }
  }
}
