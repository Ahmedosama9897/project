import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Icart } from '../../core/interfaces/icart';
import { CurrencyPipe, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'] // تم تصحيحها من 'styleUrl' إلى 'styleUrls'
})
export class CartComponent implements OnInit {

  private readonly _CartService = inject(CartService);
  private readonly _AuthService = inject(AuthService);

  // cartDetails: Icart = {} as Icart;

  get totalPrice(): number {
    return this.cartDetails.reduce((acc, item) => acc + (item.Price_out * item.Quantity), 0);
  }


  cartDetails: Icart[] = []; // ✅ Array

  userId: string = this._AuthService.userData.nameid; // أو ضع القيمة المناسبة


  ngOnInit(): void {

    this._CartService.getProductCart(this.userId).subscribe({
      next: (res) => {
        console.log("cart", res);
        this.cartDetails = res

      },
      error: (err) => {
        console.log(err);

      }
    })


  }





  removeItem(id: string, itemId: string): void {
    this._CartService.deleteSpecificCatrItem(id, itemId).subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails = res.value;
        // this._CartService.cartNumber.set(res.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
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


  // cart.component.ts


  // قائمة العناصر
  cartItems = [
    { Item_ID: 1, name: 'منتج 1', Price_out: '100 جنيه', Image_Cover: 'product1.jpg' },
    { Item_ID: 2, name: 'منتج 2', Price_out: '200 جنيه', Image_Cover: 'product2.jpg' },
    { Item_ID: 3, name: 'منتج 3', Price_out: '300 جنيه', Image_Cover: 'product3.jpg' }
  ];



  // دالة لإضافة المنتج إلى المقارنة
  Addtocomparison(ItemId: string, buyerid: string) {
    console.log('تم إضافة المنتج للمقارنة:', ItemId, buyerid);
    // منطق إضافة المنتج للمقارنة هنا
  }
}

