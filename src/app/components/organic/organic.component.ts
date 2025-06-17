import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChatbotComponent } from '../chatbot/chatbot.component';
import { Iproduct } from '../../core/interfaces/iproduct';
import { ProductsService } from '../../core/services/product.service';
import { Subscription } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { TopService } from '../../core/services/top.service';
import { ITopRated } from '../../core/interfaces/ITopRated';
import { ITopSold } from '../../core/interfaces/ITopSold';
import { IMostViewed } from '../../core/interfaces/ITopMostviewed';

@Component({
  selector: 'app-organic',
  standalone: true,
  imports: [RouterLink, ChatbotComponent, CurrencyPipe],
  templateUrl: './organic.component.html',
  styleUrl: './organic.component.css'
})
export class OrganicComponent implements OnInit {


  private readonly _ProductsService = inject(ProductsService)
  private readonly _TopService = inject(TopService)

  getAllproductSub !: Subscription;

  TopRatedDetails: ITopRated[] = [];
  TopSolddDetails: ITopSold[] = [];
  TopMostviewedDetails: IMostViewed[] = [];

  productList: Iproduct[] = [];
  ngOnInit(): void {

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
