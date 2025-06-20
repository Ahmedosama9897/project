import { Component, inject, OnInit } from '@angular/core';
import { IBrand } from '../../core/interfaces/Ibrand';
import { NgIf } from '@angular/common';
import { BrandService } from '../../core/services/brand.service';
import { AuthService } from '../../core/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.css'
})
export class BrandComponent implements OnInit {


  private readonly _BrandService = inject(BrandService)
  private readonly _AuthService = inject(AuthService)

  // userId: string = this._AuthService.userData.nameid;

  BrandDetails: IBrand[] = [];


  ngOnInit(): void {

    this._BrandService.getAllBrand().subscribe({
      next: (res) => {
        console.log("brand", res);
        this.BrandDetails = res

      },
      error: (err) => {
        console.log(err);

      }
    })


  }
}
