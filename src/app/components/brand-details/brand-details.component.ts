import { Component, inject, OnInit } from '@angular/core';
import { ibranddetails } from '../../core/interfaces/ibranddetails';
import { BrandService } from '../../core/services/brand.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-brand-details',
  templateUrl: './brand-details.component.html',
  standalone: true,
  imports: [NgIf],
})
export class BrandDetailsComponent implements OnInit {



  private readonly _BrandService = inject(BrandService)




  brandId!: number;
  brandData: ibranddetails[] = [];


  userId: string = '';

  ngOnInit(): void {
    const storedUserId = localStorage.getItem('userID');

    if (!storedUserId) {
      console.warn('User ID not found in localStorage!');
      return;
    }

    this.userId = storedUserId;


    this._BrandService.getSpecificBrand(this.userId).subscribe({
      next: (res) => {
        console.log("brand", res);
        this.brandData = res;
      },
      error: (err) => {
        console.log(err);
      }
    });

  }


}
