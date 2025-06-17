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





  userId: string = '';


  productList: Iproduct[] = [];

  categoriesList: Icategories[] = [];

  // text: string = "";
  text: string = "";

  getAllproductSub !: Subscription;

  datee = new Date();



  showPopup: boolean = true;

  ngOnInit(): void {



    setTimeout(() => {
      this.showPopup = true;
    }, 2000);

    const storedUserId = localStorage.getItem('userID');

    if (!storedUserId) {
      console.warn('User ID not found in localStorage!');
      return;
    }

    this.userId = storedUserId;

    this.loadCategories();
    this.loadCart();
    this.loadProducts();
  }


  loadCategories(): void {
    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categoriesList = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  loadCart(): void {
    this._CartService.getProductCart(this.userId).subscribe({
      next: (res) => {
        console.log("cart", res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  loadProducts(): void {
    this.getAllproductSub = this._ProductsService.getAllProducts(40).subscribe({
      next: (res) => {
        console.log('عدد المنتجات:', res.products.length);
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






  cartLoading = new Set<string>();
  cartIds = new Set<string>(); // لو بتحفظ المنتجات اللي اتضافت للسلة مؤقتًا في الواجهة

  addToCart(userId: string, itemid: string): void {
    if (this.cartLoading.has(itemid)) return;

    this.cartLoading.add(itemid);

    this._CartService.addProductToCart(userId, itemid, 1).subscribe({
      next: (res) => {
        this._ToastrService.success('Added to cart', res.messageToUser);
        this.cartIds.add(itemid); // علامة على الإضافة
        this.cartLoading.delete(itemid);
      },
      error: (err) => {
        this._ToastrService.error('Failed to add to cart');
        this.cartLoading.delete(itemid);
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
  wishlistIds = new Set<string>();
  wishlistLoading = new Set<string>();

  addWish(id: string, itemid: string): void {
    if (this.wishlistIds.has(itemid)) {
      this._ToastrService.info('This item is already in your wishlist.');
      return;
    }

    if (this.wishlistLoading.has(itemid)) return;

    this.wishlistLoading.add(itemid);

    this._WishListService.addProductToWish(id, itemid).subscribe({
      next: (res) => {
        this._ToastrService.success('Added to wishlist', res.messageToUser);
        this.wishlistIds.add(itemid);
        this.wishlistLoading.delete(itemid);
      },
      error: (err) => {
        console.error('❌ Error:', err);
        this._ToastrService.info('This item is already in your wishlist.');
        this.wishlistLoading.delete(itemid);
      }
    });




  }







  isNew(date: string): boolean {
    const insertDate = new Date(date);
    const today = new Date();
    const diffInDays = Math.floor((today.getTime() - insertDate.getTime()) / (1000 * 60 * 60 * 24));
    return diffInDays <= 7;
  }






}