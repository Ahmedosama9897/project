import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Icart } from '../../core/interfaces/icart';
import { Datum } from '../../core/interfaces/igetaddress';
import { AddressService } from '../../core/services/address.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../core/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  standalone: true,
  imports: [CurrencyPipe, NgFor, NgIf, CurrencyPipe],
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartDetails: Icart[] = [];
  addresses: Datum[] = [];
  selectedAddress: Datum | null = null;

  totalPrice: number = 0;
  selectedPayment: string = 'card'; // 'card' or 'cod'
  userId: string = '';

  isLoading: boolean = true;
  noAddresses: boolean = false;

  constructor(
    private addressService: AddressService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    const nav = history.state;
    this.cartDetails = nav.cartDetails || [];
    this.totalPrice = nav.totalPrice || 0;
    this.userId = nav.userId;

    this.addressService.getAddressProfile(this.userId).subscribe({
      next: (res) => {
        this.addresses = res.data || [];
        this.selectedAddress = this.addresses[0] || null;
        this.isLoading = false;
        this.noAddresses = this.addresses.length === 0;
      },
      error: (err) => {
        console.error('Error fetching addresses:', err);
        this.isLoading = false;
        this.noAddresses = true;
      }
    });

    this.calculateTotal();
  }

  calculateTotal(): void {
    this.totalPrice = this.cartDetails.reduce((acc, item) => {
      return acc + item.Price_out * item.Quantity;
    }, 0);
  }

  confirmOrder(): void {
    if (!this.selectedAddress) {
      alert('Please select a shipping address');
      return;
    }

    if (this.selectedPayment === 'card') {
      const integrationId = '5037623';
      const addressId = this.selectedAddress.Id!;

      this.addressService.pay(integrationId, this.userId, addressId.toString()).subscribe({
        next: (res) => {
          const paymentUrl = res.paymentUrl;
          if (paymentUrl) {
            window.open(paymentUrl, '_blank');

          } else {
            alert('Failed to get payment URL.');
            console.log(res);
          }
        },
        error: (err) => {
          console.error('Error during payment:', err);
          alert('Payment initiation failed.');
        }
      });

    } else if (this.selectedPayment === 'cod') {
      const body = {
        userId: this.userId,
        addressId: this.selectedAddress.Id,
        cartItems: this.cartDetails,
        totalPrice: this.totalPrice,
        paymentMethod: 'cod'
      };

      this.http.post(`${environment.baseUrl}api/Orders/create-cod-order`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`
        }
      }).subscribe({
        next: (res) => {
          this.router.navigate(['/profile/thank-you']);
        },
        error: (err) => {
          console.error('Error creating COD order:', err);
          alert('Failed to place order.');
        }
      });
    }
  }

  onAddressChange(event: Event): void {
    const index = (event.target as HTMLSelectElement)?.selectedIndex;
    if (index !== undefined && this.addresses.length > 0) {
      this.selectedAddress = this.addresses[index];
    }
  }
}
