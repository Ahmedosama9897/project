import {
  Component, OnInit, OnDestroy, inject, HostListener,
} from '@angular/core';
import {
  RouterLink,
  RouterLinkActive
} from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { finalize, tap } from 'rxjs/operators';

import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { CategoriesService } from '../../core/services/categories.service';
import { ProductsService } from '../../core/services/product.service';
import { SelectFiltersServicesService } from '../../core/services/select-filters-services.service';
import { WishListService } from '../../core/services/wishlist.service';

import { Icategories } from '../../core/interfaces/icategories';
import { ISubCategory } from '../../core/interfaces/Isubcategory';
import { IBrand } from '../../core/interfaces/Ibrand';
import { Iproduct } from '../../core/interfaces/iproduct';
import { Iwish } from '../../core/interfaces/iwish';
import { Icart } from '../../core/interfaces/icart';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass, NgIf, ReactiveFormsModule],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.css',
})
export class NavBlankComponent implements OnInit, OnDestroy {
  readonly _AuthService = inject(AuthService);
  private readonly _CartService = inject(CartService);
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _WishListService = inject(WishListService);
  private readonly _ProductsService = inject(ProductsService);
  private readonly fb = inject(FormBuilder);
  private readonly _SelectFiltersService = inject(SelectFiltersServicesService);

  address = '1418 Riverwood Drive, CA 96052, US';
  contactNumber = '+91 888 104 2340';
  languages = ['English', 'Spanish', 'French'];
  currencies = ['USD', 'USDT'];
  selectedLanguage = 'English';
  selectedCurrency = 'USD';

  productList: Iproduct[] = [];
  categoryList: Icategories[] = [];
  subCategoryList: ISubCategory[] = [];
  brandList: IBrand[] = [];
  wishDetails: Iwish[] = [];
  cartDetails: Icart[] = [];

  isDropdownOpen = false;
  showFilters = false;
  isLoading = false;

  selectedOption = 'Select Sub Category';
  selectedCatOption = 'Select Category';
  categoryId = 0;
  subCategoryId = 0;
  userId: string | null = '';

  filterForm!: FormGroup;

  private boundCloseDropdown = this.closeDropdownOutside.bind(this);

  ngOnInit(): void {
    document.addEventListener('click', this.boundCloseDropdown);

    const storedUserId = localStorage.getItem('userID');
    if (!storedUserId) {
      console.warn('User ID not found in localStorage!');
      return;
    }

    this.userId = storedUserId;

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
      pageSize: [10],
    });

    this._WishListService.getProductWish(this.userId).subscribe({
      next: (res) => {
        this.wishDetails = res.data;
        this._WishListService.WishNumber.set(res.length);
      },
      error: (err) => console.error(err),
    });

    this._CartService.getProductCart(this.userId).subscribe({
      next: (res) => (this.cartDetails = res),
      error: (err) => console.error(err),
    });

    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => (this.categoryList = res),
    });

    this.getProducts();
  }

  applyFilters() {
    this.showFilters = false;
    this.isLoading = true;

    this.filterForm.patchValue({
      sellerId: this.userId,
      categry: this.categoryId || null,
      subCategry: this.subCategoryId || null,
    });

    this.getProducts();
  }

  getProducts() {
    const filters = this.filterForm.value;
    this.isLoading = true;

    this._ProductsService.getFilteredProducts(filters)
      .pipe(
        finalize(() => (this.isLoading = false)),
        tap((res: any) => {
          this.productList = [];
          if (res.message === 'success' && res.products) {
            this.productList = res.products;
          } else if (Array.isArray(res)) {
            this.productList = res;
          }
        })
      )
      .subscribe({
        error: (err) => console.error(err),
      });
  }

  onCategoryChange(event: Event) {
    const categoryId = this.filterForm.get('categry')?.value;
    this.categoryId = categoryId;
    this.subCategoryList = [];
    this.brandList = [];

    if (categoryId) {
      this._SelectFiltersService.GetAllSubCategoryByCat(categoryId).subscribe({
        next: (res) => (this.subCategoryList = res),
      });
    }
  }

  onSubCategoryChange(event: Event) {
    const subCategoryId = this.filterForm.get('subCategry')?.value;
    this.subCategoryId = subCategoryId;
    this.brandList = [];

    if (subCategoryId) {
      this._SelectFiltersService.GetSubCategoryBrands(subCategoryId).subscribe({
        next: (res) => (this.brandList = res.Brands),
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

  @HostListener('window:scroll', [])
  onScroll(): void {
    const header = document.querySelector('header');
    if (window.scrollY > 10) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.boundCloseDropdown);
  }
}
