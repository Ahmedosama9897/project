import { FooterComponent } from './../../components/footer/footer.component';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavBlankComponent } from "../../components/nav-blank/nav-blank.component";
import { NavAuthComponent } from "../../components/nav-auth/nav-auth.component";

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, NavAuthComponent,],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css'
})
export class AuthLayoutComponent {

}
