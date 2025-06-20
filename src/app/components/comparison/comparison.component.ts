import { Component, OnInit, inject } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { ComparisonService } from '../../core/services/comparison.service';
import { ComparisonGroup } from '../../core/interfaces/icomparisonAll';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-comparison',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.css'],
})
export class ComparisonComponent implements OnInit {
  private readonly comparisonService = inject(ComparisonService);
  private readonly authService = inject(AuthService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);


  phones: any[] = [];
  laptops: any[] = [];
  pcs: any[] = [];

  selectedTab: 'phones' | 'laptops' | 'pcs' = 'phones';

  userId: string = '';

  ngOnInit(): void {
    const storedUserId = localStorage.getItem('userID');

    if (!storedUserId) {
      console.warn('User ID not found in localStorage!');
      return;
    }

    this.userId = storedUserId;

    this.loadComparisonFromAPI(); // ✅ دايمًا نجيب الجديد
  }





  loadComparisonFromAPI(): void {
    if (!this.userId) return;

    this.comparisonService.getProductComparison(this.userId).subscribe({
      next: (response: any) => {
        const parsed: ComparisonGroup = JSON.parse(response);
        this.phones = parsed.phones.Data;
        this.laptops = parsed.laptops.Data;
        this.pcs = parsed.pCs.Data;
        this.saveToLocalStorage();
      },
      error: err => console.error(err)
    });
  }

  removeItem(itemId: string): void {
    this.comparisonService.deleteSpecificComparisonItem(this.userId, itemId).subscribe({
      next: () => {
        this.phones = this.phones.filter(p => p.Item_ID !== itemId);
        this.laptops = this.laptops.filter(p => p.Item_ID !== itemId);
        this.pcs = this.pcs.filter(p => p.Item_ID !== itemId);
        this.saveToLocalStorage();
      },
      error: err => console.error(err)
    });
  }



  addCart(buyerId: string, itemId: string, quantity: number): void {
    console.log(buyerId);
    console.log(itemId);
    console.log(quantity);

    this._CartService.addProductToCart(buyerId, itemId, quantity).subscribe({
      next: (res) => {
        console.log('✅ Response from API:', res);
        this._ToastrService.success('Added to Cart', res.message);

        this.loadComparisonFromAPI();

        this.saveToLocalStorage();
        // if (res && typeof res === 'number') {
        //   this._CartService.cartNumber.set(res);
        //   console.log('🛒 عدد المنتجات في السلة الآن:', this._CartService.cartNumber());
        // } else {
        //   console.log('⚠️ `cartCount` غير موجود في الـ API Response، تحقق من الاستجابة!');
        // }
      },
      error: (err) => {
        console.error('❌ خطأ أثناء إضافة المنتج إلى السلة:', err);
      }
    });
  }


  selectedTabData() {
    switch (this.selectedTab) {
      case 'phones': return this.phones;
      case 'laptops': return this.laptops;
      case 'pcs': return this.pcs;
      default: return [];
    }
  }

  clearAll() {
    const currentList = this.selectedTabData();
    const ids = currentList.map(item => item.Item_ID);
    ids.forEach(id => this.removeItem(id));
  }

  saveToLocalStorage() {
    const data = {
      phones: this.phones,
      laptops: this.laptops,
      pcs: this.pcs
    };
    localStorage.setItem('comparisonData', JSON.stringify(data));
  }
}
