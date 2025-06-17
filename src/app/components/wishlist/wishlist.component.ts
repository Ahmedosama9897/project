import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Iwish } from '../../core/interfaces/iwish';
import { CartService } from '../../core/services/cart.service';
import { WishListService } from '../../core/services/wishlist.service';
import { AuthService } from '../../core/services/auth.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { Icart } from '../../core/interfaces/icart';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class WishlistComponent implements OnInit {

  private readonly _CartService = inject(CartService);
  private readonly _WishListService = inject(WishListService);

  private readonly _AuthService = inject(AuthService);
  private readonly _ToastrService = inject(ToastrService)
  // cartDetails: Icart = {} as Icart;



  cartDetails: Icart[] = []; // ✅ Array
  wishDetails: Iwish[] = [] // ✅ Array


  userId: string = '';



  ngOnInit(): void {
    const storedUserId = localStorage.getItem('userID');

    if (!storedUserId) {
      console.warn('User ID not found in localStorage!');
      return;
    }

    this.userId = storedUserId;

    this._WishListService.getProductWish(this.userId).subscribe({
      next: (res) => {
        console.log("wish", res);
        this.wishDetails = res.data;
        this._WishListService.WishNumber.set(res.length);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }






  removeWish(id: string, itemId: string): void {
    this._WishListService.deleteSpecificWishItem(id, itemId).subscribe({
      next: () => {
        this.wishDetails = this.wishDetails.filter(item => item.Item_ID !== itemId);
        this._WishListService.WishNumber.set(this.wishDetails.length);
        this._ToastrService.success('Item removed from wishlist');
      },
      error: (err) => {
        console.error(err);
        this._ToastrService.error('Failed to remove item');
      }
    });
  }

  UpdateCount(id: string, itemId: string, quantity: number): void {
    // تحقق من إذا كانت الكمية أكبر من 0 قبل إرسال الطلب
    if (quantity <= 0) {
      console.log('Quantity must be greater than 0');
      return;
    }

    this._CartService.UpdateProductQuantity(id, itemId, quantity).subscribe({
      next: (res) => {
        console.log('Response:', res);
        if (res && res.value) {
          this.cartDetails = res.value;  // تأكد من أن response يحتوي على البيانات المطلوبة
        } else {
          console.log('No data returned from server');
        }
      },
      error: (err) => {
        console.error('Error:', err);
        // يمكنك عرض رسالة خطأ للمستخدم هنا
      }
    });
  }


  ClearItem(id: string): void {
    this._CartService.ClearCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails = res.value;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }



  addCart(buyerId: string, itemId: string, quantity: number): void {
    console.log(buyerId);
    console.log(itemId);
    console.log(quantity);

    this._CartService.addProductToCart(buyerId, itemId, quantity).subscribe({
      next: (res) => {
        console.log('✅ Response from API:', res);

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
