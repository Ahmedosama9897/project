// import { Component } from '@angular/core';
// import { RouterLink, RouterLinkActive } from '@angular/router';

// @Component({
//   selector: 'app-nav-blank',
//   standalone: true,
//   imports: [RouterLink,RouterLinkActive],
//   templateUrl: './nav-blank.component.html',
//   styleUrl: './nav-blank.component.css'
// })
// export class NavBlankComponent {
//   address: string = '1418 Riverwood Drive, CA 96052, US';
//   contactNumber: string = '+91 888 104 2340';
//   languages: string[] = ['English', 'Spanish', 'French'];
//   currencies: string[] = ['USD', 'USDT'];
//   selectedLanguage: string = 'English';
//   selectedCurrency: string = 'USD';
// }

import { Component, computed, inject, OnDestroy, OnInit, Signal, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.css'
})
export class NavBlankComponent implements OnInit, OnDestroy {

  readonly _AuthService = inject(AuthService)
  private readonly _CartService = inject(CartService)


  address: string = '1418 Riverwood Drive, CA 96052, US';
  contactNumber: string = '+91 888 104 2340';
  languages: string[] = ['English', 'Spanish', 'French'];
  currencies: string[] = ['USD', 'USDT'];
  selectedLanguage: string = 'English';
  selectedCurrency: string = 'USD';


  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdownOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('#dropdownWrapper')) {
      this.isDropdownOpen = false;
    }
  }




  // countNumber: Signal<number> = computed ( ()=>  this._CartService.cartNumber() )
  // countwishNumber: Signal<number> = computed(() => this._WishListService.WishNumber())


  ngOnInit(): void {


    document.addEventListener('click', this.closeDropdownOutside.bind(this));


    // this._CartService.getProductCart().subscribe({
    //   next:(res)=>{
    //     console.log('cart items' ,  res);
    //     this._CartService.cartNumber.set(res.numOfCartItems)


    //   }
    // })

    // this._WishListService.getProductWish().subscribe({
    //   next: (res) => {
    //     console.log('wish items', res);
    //     this._WishListService.WishNumber.set(res.numOfCartItems)


    //   }
    // })


  }


  ngOnDestroy() {
    document.removeEventListener('click', this.closeDropdownOutside.bind(this));
  }


}
