import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChatbotComponent } from '../chatbot/chatbot.component';
import { Iproduct } from '../../core/interfaces/iproduct';
import { ProductsService } from '../../core/services/product.service';
import { Subscription } from 'rxjs';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-organic',
  standalone: true,
  imports: [RouterLink, ChatbotComponent, CurrencyPipe],
  templateUrl: './organic.component.html',
  styleUrl: './organic.component.css'
})
export class OrganicComponent implements OnInit {


  private readonly _ProductsService = inject(ProductsService)

  getAllproductSub !: Subscription;


  productList: Iproduct[] = [];
  ngOnInit(): void {



    this.getAllproductSub = this._ProductsService.getAllProductstopsell().subscribe({
      next: (res) => {
        console.log('عدد المنتجات:', res.products.length); // 👈 شوف دي تطبع إيه
        this.productList = res.products;
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.getAllproductSub = this._ProductsService.getAllProducts(20).subscribe({
      next: (res) => {
        console.log('عدد المنتجات:', res.products.length); // 👈 شوف دي تطبع إيه
        this.productList = res.products;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
