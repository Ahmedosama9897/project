import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-redirect',
  template: `<p class="text-center text-gray-600 p-6">Processing payment...</p>`
})
export class PaymentRedirectComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const success = params['success'];
      if (success === 'true') {
        this.router.navigate(['/profile/thank-you']);
      } else {
        this.router.navigate(['/home']); // أو أي صفحة خطأ/إلغاء
      }
    });
  }
}
