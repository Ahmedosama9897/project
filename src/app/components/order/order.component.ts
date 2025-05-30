import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule],
 templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrdersComponent implements OnInit {
 
  private readonly _ActivatedRoute = inject(ActivatedRoute)
 
 
  orders: FormGroup = new FormGroup({
    details: new FormControl(null),
    Phone: new FormControl(null),
    city: new FormControl(null),
  })

  cartId:string | null = "";

    ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
      this.cartId =  params.get('id')
        
      }

    })
  }


  // ordersSubmit():void{
  //   console.log(this.orders.value);

  //   this._OrdersService.checkOut(this.cartId , this.orders.value).subscribe({
  //     next:(res)=>{
  //       console.log(res);
  //       if(res.status === 'success'){
        
        
  //         window.open( res.session.url , '_self')
        
        
        
  //       }
        
  //     },
  //     error:(err)=>{
  //       console.log(err);
        
  //     }
  //   })
    
  // }


}
