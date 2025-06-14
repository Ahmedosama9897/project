import { CurrencyPipe, NgIf } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { Icategories } from '../../core/interfaces/icategories';
import { CartService } from '../../core/services/cart.service';
import { CategoriesService } from '../../core/services/categories.service';
import { ProductsService } from '../../core/services/product.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../core/services/wishlist.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, FormsModule, CurrencyPipe, RouterLink, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnDestroy, OnInit {
  private readonly _CartService = inject(CartService)
  private readonly _CategoriesService = inject(CategoriesService)
  private readonly _ProductsService = inject(ProductsService)
  private readonly _AuthService = inject(AuthService)
  private readonly _ToastrService = inject(ToastrService)
  private readonly _WishListService = inject(WishListService)


  wishlistIds = new Set<string>();


  userId: string = this._AuthService.userData.nameid; // أو ضع القيمة المناسبة


  productList: Iproduct[] = [];

  categoriesList: Icategories[] = [];

  // text: string = "";
  text: string = "";

  getAllproductSub !: Subscription;

  datee = new Date();


  ngOnInit(): void {

    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res);
        this.categoriesList = res; //res.data
      },
      error: (err) => {
        console.log(err);

      }
    })


    this._CartService.getProductCart(this.userId).subscribe({
      next: (res) => {
        console.log("cart", res);

        // this.cartDetails = res.data

      },
      error: (err) => {
        console.log(err);

      }
    })




    this.getAllproductSub = this._ProductsService.getAllProducts(40).subscribe({
      next: (res) => {
        console.log('عدد المنتجات:', res.products.length); // 👈 شوف دي تطبع إيه
        this.productList = res.products;
      },
      error: (err) => {
        console.log(err);
      }
    });


  }


  customOptionsMain: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 3000,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,

    nav: true
  }



  customOptionsCat: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 3000,
    dots: true,
    navSpeed: 700,
    margin: 10,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }



  ngOnDestroy(): void {

    this.getAllproductSub?.unsubscribe()

  }









  addCart(buyerId: string, itemId: string, quantity: number): void {
    console.log(buyerId);
    console.log(itemId);
    console.log(quantity);

    this._CartService.addProductToCart(buyerId, itemId, quantity).subscribe({
      next: (res) => {
        console.log('✅ Response from API:', res);
        this._ToastrService.success(' Add to Cart 🛒 ', 'Inspire')

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







  // addWish(id: string): void {
  //   this._WishListService.addProductToWish(id).subscribe({
  //     next: (res) => {
  //       console.log(res);
  //       this._WishListService.WishNumber.set(res.count)


  //       console.log(this._WishListService.WishNumber());

  //     },
  //     error: (err) => {
  //       console.log(err);

  //     }
  //   })
  // }

  // productTrackBy(index: number, product: Iproduct): string {
  //   return product.Data.Item_ID;
  // }




  addWish(id: string, itemid: string): void {

    // if (this.wishlistIds.has(itemid)) {
    //   this._ToastrService.info('This product is already in your wishlist');
    //   return;
    // }


    console.log('✅ Product added to wishlist:', id, itemid);

    this._WishListService.addProductToWish(id, itemid).subscribe({
      next: (res) => {
        this._ToastrService.success('Added to wishlist', res.messageToUser);
        // this.wishlistIds.add(itemid); // ✅ مهم تضيفه هنا
      },
      error: (err) => {
        console.error('❌ Error:', err);
        if (err.status === 500) {
          this._ToastrService.error('Internal server error: please try again later.');
        } else if (err.status === 404) {
          this._ToastrService.warning('Product not found.');
        } else {
          this._ToastrService.error('Failed to add product to wishlist.');
        }
      }
    });


  }







  isNew(date: string): boolean {
    const insertDate = new Date(date);
    const today = new Date();
    const diffInDays = Math.floor((today.getTime() - insertDate.getTime()) / (1000 * 60 * 60 * 24));
    return diffInDays <= 7;
  }


  getCleanItemId(rawId: string): string {
    return rawId.includes('-') ? rawId.split('-')[1] : rawId;
  }




}