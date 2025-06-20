import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChatbotComponent } from '../chatbot/chatbot.component';
import { Iproduct } from '../../core/interfaces/iproduct';
import { ProductsService } from '../../core/services/product.service';
import { Subscription } from 'rxjs';
import { CurrencyPipe, NgIf } from '@angular/common';
import { TopService } from '../../core/services/top.service';
import { ITopRated } from '../../core/interfaces/ITopRated';
import { ITopSold } from '../../core/interfaces/ITopSold';
import { IMostViewed } from '../../core/interfaces/ITopMostviewed';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../core/services/wishlist.service';
import { AuthService } from '../../core/services/auth.service';
import { CategoriesService } from '../../core/services/categories.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SelectFiltersServicesService } from '../../core/services/select-filters-services.service';
import { Icategories } from '../../core/interfaces/icategories';
import { ISubCategory } from '../../core/interfaces/Isubcategory';
import { IBrand } from '../../core/interfaces/Ibrand';
import { Iwish } from '../../core/interfaces/iwish';
import { Icart } from '../../core/interfaces/icart';

@Component({
  selector: 'app-organic',
  standalone: true,
  imports: [RouterLink, ChatbotComponent, CurrencyPipe, NgIf, ReactiveFormsModule],
  templateUrl: './organic.component.html',
  styleUrl: './organic.component.css'
})
export class OrganicComponent implements OnInit {


  readonly _AuthService = inject(AuthService);
  private readonly _CartService = inject(CartService);
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _WishListService = inject(WishListService);
  private readonly _ProductsService = inject(ProductsService);
  private readonly fb = inject(FormBuilder);
  private readonly _SelectFiltersService = inject(SelectFiltersServicesService);


  private readonly _TopService = inject(TopService)
  private readonly _ToastrService = inject(ToastrService)



  userId: string = '';
  getAllproductSub !: Subscription;

  TopRatedDetails: ITopRated[] = [];
  TopSolddDetails: ITopSold[] = [];
  TopMostviewedDetails: IMostViewed[] = [];

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
  cartDetails: Icart[] = [];



  private boundCloseDropdown = this.closeDropdownOutside.bind(this);


  ngOnInit(): void {

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



    this.loadCart();
    this.loadProducts();

    this._TopService.getTopRated().subscribe({
      next: (res) => {
        console.log("TopRated", res);
        this.TopRatedDetails = res

      },
      error: (err) => {
        console.log(err);

      }
    })
    this._TopService.getTopSold().subscribe({
      next: (res) => {
        console.log("Topsold", res);
        this.TopSolddDetails = res

      },
      error: (err) => {
        console.log(err);

      }
    })


    this._TopService.getMostViewed().subscribe({
      next: (res) => {
        console.log("TopMostViewed", res);
        this.TopMostviewedDetails = res

      },
      error: (err) => {
        console.log(err);

      }
    })











    this.getAllproductSub = this._ProductsService.getAllProductstopsell().subscribe({
      next: (res) => {
        console.log('عدد المنتجات:', res.products.length); // 👈 شوف دي تطبع إيه
        this.productList = res.products;
      },
      error: (err) => {
        console.log(err);
      }
    });

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

  ngOnDestroy() {
    document.removeEventListener('click', this.boundCloseDropdown);
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
    this.getAllproductSub = this._ProductsService.getAllProducts(10).subscribe({
      next: (res) => {
        console.log('عدد المنتجات:', res.products.length);
        this.productList = res.products;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }





  isNew(date: string): boolean {
    const insertDate = new Date(date);
    const today = new Date();
    const diffInDays = Math.floor((today.getTime() - insertDate.getTime()) / (1000 * 60 * 60 * 24));
    return diffInDays <= 7;
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












}
