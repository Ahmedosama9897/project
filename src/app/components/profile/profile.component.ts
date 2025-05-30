import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AppComponent } from "../../app.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  activeTab: string = 'profile';  // يحدد التبويب النشط في البداية

  // هذه الدالة تحدد التبويب النشط عند النقر على التبويب
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}