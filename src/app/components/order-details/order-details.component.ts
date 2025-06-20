import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrderService } from '../../core/services/order.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink],
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  orderId: string = '';
  items: any[] = [];
  isLoading: boolean = true;

  constructor(private route: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id') || '';
    if (this.orderId) {
      this.orderService.GetOrderItems(this.orderId).subscribe({
        next: (res) => {
          this.items = res.data || [];
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Failed to load order details:', err);
          this.isLoading = false;
        }
      });
    }
  }
}
