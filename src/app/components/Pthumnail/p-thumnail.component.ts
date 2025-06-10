import { Component, inject, OnInit } from '@angular/core';
import { NavBlankComponent } from "../nav-blank/nav-blank.component";
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/product.service';
import { log } from 'console';
import { Iproduct } from '../../core/interfaces/iproduct';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-p-thumnail',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './p-thumnail.component.html',
  styleUrl: './p-thumnail.component.css'
})
export class PThumnailComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);


  // detailsProduct: Iproduct ={ } as Iproduct
  detailsProduct: Iproduct | null = null;


  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        let idProduct = p.get('id');

        this._ProductsService.getSpecificProducts(idProduct).subscribe({
          next: (res) => {
            console.log(res.Data);
            this.detailsProduct = res; // لو المنتج في res مباشرة


          },
          error: (err) => {
            console.log(err);

          }
        })

      }
    })
  }

  addCart(buyerId: string, itemId: string, quantity: number): void {
    console.log(buyerId);
    console.log(itemId);
    console.log(quantity);

    this._CartService.addProductToCart(buyerId, itemId, quantity).subscribe({
      next: (res) => {
        console.log('✅ Response from API:', res);
        this._ToastrService.success('دارت يا صيييع', 'Inspire')

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
}
