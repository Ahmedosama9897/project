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
import { OrdersComponent } from './components/order/order.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { ProfileComponent } from './components/profile/profile.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { DetailsComponent } from './components/details/details.component';
import { SettingsComponent } from '../settings/settings.component';
import { PaymentComponent } from './components/payment/payment.component';
import { FaqsComponent } from './components/faqs/faqs.component';
import { ProfComponent } from './components/prof/prof.component';
import { ComparisonComponent } from './components/comparison/comparison.component';

// إضافة المكونات الجديدة

export const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      {
        path: 'login', title: 'login',
        loadComponent: () =>
          import('./components/login/login.component').then(
            (C) => C.LoginComponent
          )
      },
      { path: 'register', component: RegisterComponent },
      {
        path: 'register', title: 'register',
        loadComponent: () =>
          import('./components/register/register.component').then(
            (C) => C.RegisterComponent
          )
      }
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
      { path: 'cart/order', component: OrdersComponent },
      { path: 'comparison', component: ComparisonComponent },
      {
        path: 'profile', component: ProfileComponent, children: [

          // إضافة التوجيهات للمكونات الجديدة
          { path: 'prof', component: ProfComponent },
          { path: 'details', component: DetailsComponent },
          { path: 'settings', component: SettingsComponent },
          { path: 'payment', component: PaymentComponent },
          { path: 'faqs', component: FaqsComponent },

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
