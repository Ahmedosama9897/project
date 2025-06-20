import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../core/services/order.service';
import { Igetitem } from '../../core/interfaces/Igetorderitem';
import { Datum } from '../../core/interfaces/IGetUserOrders';
import { NgFor, NgIf } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { Icart } from '../../core/interfaces/icart';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {


  private readonly _CartService = inject(CartService)

  orders: Datum[] = [];
  userId: string = '';

  cartDetails: Icart[] = []; // ✅ Array
  orderItemsMap: { [orderId: number]: Igetitem['data'] } = {};

  constructor(
    private orderService: OrderService, private router: Router
  ) { }


  ngOnInit(): void {
    const storedUserId = localStorage.getItem('userID');
    if (!storedUserId) {
      console.warn('User ID not found in localStorage!');
      return;
    }

    this.userId = storedUserId;

    // ✅ Check if user just created an order
    const orderFromNav = history.state?.orderId;
    if (orderFromNav) {
      this.router.navigate(['/thank-you'], {
        state: { orderId: orderFromNav }
      });
      return; // نوقف هنا لأن التوجيه حصل
    }

    // تحميل السلة
    this._CartService.getProductCart(this.userId).subscribe({
      next: (res) => {
        this.cartDetails = res;
      },
      error: (err) => {
        console.log(err);
      }
    });

    // تحميل الطلبات
    this.loadOrders();
  }


  loadOrders(): void {
    this.orderService.GetUserOrders(this.userId).subscribe({
      next: res => {
        this.orders = (res.data || []).sort((a: Datum, b: Datum) =>
          new Date(b.Book_Date).getTime() - new Date(a.Book_Date).getTime()
        );

        this.orders.forEach(order => {
          this.orderService.GetOrderItems(order.IDFromPaymob.toString()).subscribe({
            next: res => {
              this.orderItemsMap[order.IDFromPaymob] = res.data;
            },
            error: err => console.error('Error loading order items:', err)
          });
        });
      },
      error: err => console.error('Error loading orders:', err)
    });
  }
}
