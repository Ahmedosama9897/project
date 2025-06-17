import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/product.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { Iproductreview, Datum } from '../../core/interfaces/Iproductreview';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-p-thumnail',
  standalone: true,
  imports: [CurrencyPipe, NgIf, NgFor],
  animations: [
    trigger('fadeSlideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px) scale(0.98)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
      ])
    ])
  ],
  templateUrl: './p-thumnail.component.html',
  styleUrl: './p-thumnail.component.css'
})
export class PThumnailComponent implements OnInit {

  user = {
    avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Jocelyn',
  };

  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);

  detailsProduct: Iproduct | null = null;
  productReviews: Datum[] = [];
  newComment: string = '';
  newRating: number = 0;



  setRating(star: number): void {
    this.newRating = star;
    this._ToastrService.info(`You selected ${star} stars ⭐`);
  }




  loadReviews(itemId: string): void {
    this._ProductsService.getProductReviews(itemId).subscribe({
      next: (res: Iproductreview) => {
        this.productReviews = res?.data || [];
      },
      error: (err) => console.log('❌ Error loading reviews:', err)
    });
  }

  submitReview(comment: string, rating: string): void {
    const trimmed = comment?.trim();
    const ratingValue = Number(rating);
    const itemId = this.detailsProduct?.Data?.Item_ID;
    const buyerId = Number(localStorage.getItem('userID'));
    const buyerName = localStorage.getItem('userName') || 'You';

    if (!trimmed || !itemId || ratingValue < 1 || ratingValue > 5 || !buyerId) {
      this._ToastrService.warning('Please fill in all fields correctly');
      return;
    }

    // ✅ التحقق من الإساءة أولاً
    this._ProductsService.getcheck(trimmed).subscribe({
      next: (checkRes) => {
        if (checkRes?.is_clean === false) {
          this._ToastrService.error('🚫 Your comment contains abusive language.');
          return;
        }

        // ✅ لو التعليق نظيف، ابعته عادي
        this._ProductsService.AddProductReview(ratingValue, trimmed, itemId, buyerId).subscribe({
          next: () => {
            const newReview: Datum = {
              Review_ID: Date.now(),
              Buyer_Name: buyerName,
              Comment: trimmed,
              Rating: ratingValue,
              Created_At: new Date().toISOString()
            };
            this.productReviews = [newReview, ...this.productReviews];
            this._ToastrService.success('✅ Comment submitted!');
          },
          error: (err) => {
            console.error('❌ Error submitting review:', err);
          }
        });
      },
      error: (err) => {
        console.error('❌ Error checking comment content:', err);
        this._ToastrService.error('Could not verify comment content.');
      }
    });
  }


  ngOnInit(): void {
    const userId: number | null = localStorage.getItem('userID') !== null
      ? Number(localStorage.getItem('userID'))
      : null;

    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        const idProduct = p.get('id');
        if (!idProduct) return;

        this._ProductsService.getSpecificProducts(idProduct).subscribe({
          next: (res) => {
            this.detailsProduct = res;
            if (res?.Data?.Item_ID && userId !== null) {
              this._ProductsService.Addview(res.Data.Item_ID, userId).subscribe({
                next: () => { },
                error: (err) => console.log(err)
              });

              this.loadReviews(res.Data.Item_ID);
            }
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
    });
  }

  addCart(buyerId: string, itemId: string, quantity: number): void {
    this._CartService.addProductToCart(buyerId, itemId, quantity).subscribe({
      next: (res) => {
        console.log('✅ Response from API:', res);
        this._ToastrService.success('دارت يا صيييع', 'Inspire');
      },
      error: (err) => {
        console.error('❌ خطأ أثناء إضافة المنتج إلى السلة:', err);
      }
    });
  }


}
