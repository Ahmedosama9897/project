// ✅ comparison.component.ts
import { CurrencyPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { AuthService } from '../../core/services/auth.service';
import { ComparisonService } from '../../core/services/comparison.service';
import { ComparisonGroup } from '../../core/interfaces/icomparisonAll';
import { PhoneProduct } from '../../core/interfaces/icomparisonPhones';
import { PcProduct } from '../../core/interfaces/icomparisonPCs';
import { labtopProduct } from '../../core/interfaces/icomparisonLabtop';

@Component({
  selector: 'app-comparison',
  standalone: true,
  imports: [CurrencyPipe, NgIf, NgFor, NgClass],
  templateUrl: './comparison.component.html',
  styleUrl: './comparison.component.css'
})
export class ComparisonComponent implements OnInit {
  private readonly _comparisonService = inject(ComparisonService);
  private readonly _cartService = inject(CartService);
  private readonly _authService = inject(AuthService);

  comparisonphone: PhoneProduct[] = [];
  comparisonPcs: PcProduct[] = [];
  comparisonLaptops: labtopProduct[] = [];
  userId: string = this._authService.userData.nameid;
  selectedProduct: PcProduct | PhoneProduct | labtopProduct | null = null;

  activeTab: 'phones' | 'pcs' | 'laptops' = 'phones';

  ngOnInit(): void {
    this._comparisonService.getProductComparison(this.userId).subscribe({
      next: (res: ComparisonGroup) => {
        this.comparisonphone = res.phones?.Data ?? [];
        this.comparisonPcs = res.pCs?.Data ?? [];
        this.comparisonLaptops = res.laptops?.Data ?? [];
      },
      error: (err) => {
        console.error('❌ Failed to fetch comparison items:', err);
      }
    });
  }

  trackByItemId(index: number, item: any): string {
    return item.Item_ID;
  }

  openDetailsModal(item: PcProduct | PhoneProduct | labtopProduct): void {
    this.selectedProduct = item;
  }

  closeDetailsModal(): void {
    this.selectedProduct = null;
  }

  removeItem(buyerId: string, itemId: string): void {
    this._comparisonService.deleteSpecificComparisonItem(buyerId, itemId).subscribe({
      next: (res: any) => {
        const updatedData = res?.data ?? [];

        if (this.activeTab === 'pcs') {
          this.comparisonPcs = updatedData;
        } else if (this.activeTab === 'phones') {
          this.comparisonphone = updatedData;
        } else if (this.activeTab === 'laptops') {
          this.comparisonLaptops = updatedData;
        }
      },
      error: (err) => {
        console.error('❌ Failed to remove item:', err);
      }
    });
  }

  addCart(buyerId: string, itemId: string, quantity: number): void {
    this._cartService.addProductToCart(buyerId, itemId, quantity).subscribe({
      next: (res) => {
        console.log('🛒 Added to cart:', res);
      },
      error: (err) => {
        console.error('❌ Failed to add to cart:', err);
      }
    });
  }

}
