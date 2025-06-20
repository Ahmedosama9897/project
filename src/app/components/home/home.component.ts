import { CurrencyPipe, NgIf } from '@angular/common';
import { Component, computed, inject, OnDestroy, OnInit, Signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { Data, Irecommend_list, Product } from '../../core/interfaces/recommendlist';
import { ISubCategory } from '../../core/interfaces/Isubcategory';
import { IBrand } from '../../core/interfaces/Ibrand';
import { Iwish } from '../../core/interfaces/iwish';
import { Icart } from '../../core/interfaces/icart';
import { SelectFiltersServicesService } from '../../core/services/select-filters-services.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, FormsModule, CurrencyPipe, RouterLink, NgIf, ReactiveFormsModule],
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


  private readonly fb = inject(FormBuilder);
  private readonly _SelectFiltersService = inject(SelectFiltersServicesService);


  productList: Iproduct[] = [];


  isDropdownOpen = false;
  filterForm!: FormGroup;

  categoryList: Icategories[] = [];
  subCategoryList: ISubCategory[] = [];
  brandList: IBrand[] = [];

  selectedOption: string = 'Select Sub Category';
  selectedCatOption: string = 'Select Category';
  categoryId: number = 0;
  subCategoryId: number = 0;
  showFilters = false;
  isLoading = false;
  wishDetails: Iwish[] = [] // ✅ Array
  cartDetails: Icart[] = []; // ✅ Array


  userId: string = '';

  recommendlist: Product[] = [];

  categoriesList: Icategories[] = [];

  // text: string = "";
  text: string = "";

  getAllproductSub !: Subscription;

  datee = new Date();
  private boundCloseDropdown = this.closeDropdownOutside.bind(this);

  showPopup = false;

  // showPopup: boolean = true;

  welcomeVisible = false;



  ngOnInit(): void {


    // في ngOnInit
    const isLoggedIn = localStorage.getItem('userToken');
    const welcomeShown = localStorage.getItem('welcomeShown');

    if (isLoggedIn && !welcomeShown) {
      this.welcomeVisible = true;
      setTimeout(() => this.welcomeVisible = false, 5000);
      localStorage.setItem('welcomeShown', 'true'); // ✅ علشان متتكررش
    }

    // ✅ عرض البوب أب فقط بعد التسجيل
    const justRegistered = localStorage.getItem('justRegistered');
    if (isLoggedIn && justRegistered === 'true') {
      this.showPopup = true;
      localStorage.removeItem('justRegistered');
    }








    document.addEventListener('click', this.boundCloseDropdown);

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


    this._CartService.getProductCart(this.userId).subscribe({
      next: (res) => {
        console.log("cart", res);
        this.cartDetails = res;
      },
      error: (err) => {
        console.log(err);
      }
    });




    this.filterForm = this.fb.group({
      sellerId: [this.userId],
      minPrice: [1000],
      maxPrice: [2000],
      categry: [null],
      subCategry: [null],
      minRate: [0],
      mostViewed: [false],
      newwest: [false],
      mostSold: [false],
      searchQuery: [''],
      pageNumber: [1],
      pageSize: [10]
    });

    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => this.categoryList = res
    });

    this.getProducts();


    this.loadCategories();
    this.loadCart();
    // this.loadrecommendlist();
    this.loadProducts();
  }


  closePopup(): void {
    this.showPopup = false;
  }


  applyFilters() {
    this.showFilters = false;
    this.isLoading = true;

    this.filterForm.patchValue({
      sellerId: this.userId,
      categry: this.categoryId || null,
      subCategry: this.subCategoryId || null
    });

    this.getProducts();
  }

  getProducts() {
    const filters = this.filterForm.value;
    console.log('Filters sent to API:', filters);

    this._ProductsService.getFilteredProducts(filters).subscribe({
      next: (res: any) => {
        this.productList = [];

        if (res.message === "success" && res.products) {
          this.productList = res.products;
        } else if (Array.isArray(res)) {
          this.productList = res;
        }

        this.isLoading = false;
        console.log('Updated product list:', this.productList);
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  onCategoryChange(event: Event) {
    const categoryId = this.filterForm.get('categry')?.value;
    this.categoryId = categoryId;
    this.subCategoryList = [];
    this.brandList = [];

    if (categoryId) {
      this._SelectFiltersService.GetAllSubCategoryByCat(categoryId).subscribe({
        next: (res) => this.subCategoryList = res
      });
    }
  }

  onSubCategoryChange(event: Event) {
    const subCategoryId = this.filterForm.get('subCategry')?.value;
    this.subCategoryId = subCategoryId;
    this.brandList = [];

    if (subCategoryId) {
      this._SelectFiltersService.GetSubCategoryBrands(subCategoryId).subscribe({
        next: (res) => this.brandList = res.Brands
      });
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdownOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('#dropdownWrapper')) {
      this.isDropdownOpen = false;
    }
  }

  // لو حبيت تستخدم الإشارات للـ badge:
  // countNumber: Signal<number> = computed(() => this._CartService.cartNumber())




  // loadrecommendlist(): void {
  //   this._ProductsService.getrecommendlist(this.userId).subscribe({
  //     next: (res) => {
  //       this.recommendlist = res.products;

  //     },
  //     error: (err) => {
  //       console.log(err);
  //     }
  //   });
  // }
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
    document.removeEventListener('click', this.boundCloseDropdown);

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