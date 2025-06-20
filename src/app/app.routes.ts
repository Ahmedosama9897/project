import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { OrganicComponent } from './components/organic/organic.component';
import { PThumnailComponent } from './components/Pthumnail/p-thumnail.component';
import { CartComponent } from './components/cart/cart.component';
import { CompareComponent } from './components/compare/compare.component';
import { PagesComponent } from './components/pages/pages.component';
import { BrandComponent } from './components/brand/brand.component';
import { authGuard } from './core/guards/auth.guard';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { ProfileComponent } from './components/profile/profile.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { DetailsComponent } from './components/details/details.component';
import { SettingsComponent } from '../settings/settings.component';
import { PaymentComponent } from './components/payment/payment.component';
import { FaqsComponent } from './components/faqs/faqs.component';
import { ProfComponent } from './components/prof/prof.component';
import { ComparisonComponent } from './components/comparison/comparison.component';
import { OrderComponent } from './components/order/order.component';
import { AddressComponent } from './components/address/address.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ThankYouComponent } from './components/thank-you/thank-you.component';
import { PaymentRedirectComponent } from './components/payment-redirect/payment-redirect.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { BrandDetailsComponent } from './components/brand-details/brand-details.component';

// إضافة المكونات الجديدة

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },

      {
        path: 'login',
        title: 'Login',
        loadComponent: () =>
          import('./components/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'register',
        title: 'Register',
        loadComponent: () =>
          import('./components/register/register.component').then(m => m.RegisterComponent)
      },
      {
        path: 'reset-password',
        title: 'Reset Password',
        loadComponent: () =>
          import('./components/reset-password/reset-password.component').then(m => m.ResetPasswordComponent)
      },
    ]
  },
  {
    path: '', component: BlankLayoutComponent, canActivate: [authGuard], children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home', title: 'home',
        loadComponent: () =>
          import('./components/home/home.component').then(
            (c) => c.HomeComponent
          )
      },
      { path: 'organic', component: OrganicComponent },
      { path: 'p-thumnail/:id', component: PThumnailComponent },
      { path: 'cart', component: CartComponent },
      { path: 'wishlist', component: WishlistComponent },
      { path: 'brand', component: BrandComponent },
      { path: 'cart/compare', component: CompareComponent },
      { path: 'pages', component: PagesComponent },
      { path: 'chatbot', component: ChatbotComponent },
      { path: 'cart/checkout', component: CheckoutComponent },
      { path: 'comparison', component: ComparisonComponent },
      { path: 'brand-details/:id', component: BrandDetailsComponent },
      {
        path: 'profile', component: ProfileComponent, children: [

          // إضافة التوجيهات للمكونات الجديدة
          { path: 'thank-you', component: ThankYouComponent },

          { path: 'prof', component: ProfComponent },
          { path: 'details', component: DetailsComponent },
          { path: 'settings', component: SettingsComponent },
          { path: 'address', component: AddressComponent },
          { path: 'order', component: OrderComponent },
          { path: 'payment', component: PaymentComponent },
          { path: 'faqs', component: FaqsComponent },
          { path: 'payment-redirect', component: PaymentRedirectComponent },
          { path: 'order-details/:id', component: OrderDetailsComponent }


        ]
      },


      // {

      //   path: '', component: ProfileLayoutComponent, canActivate: [authGuard], children: [
      //     { path: '', redirectTo: 'profile', pathMatch: 'full' },
      //     {
      //       path: 'profile', title: 'profile',
      //       loadComponent: () =>
      //         import('./components/profile/profile.component').then(
      //           (c) => c.ProfileComponent
      //         )
      //     },


      //   ]

      // },

    ]


  },


  { path: '**', component: NotfoundComponent }
];
