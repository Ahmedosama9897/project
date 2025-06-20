import { Component, inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Iprofile } from '../../core/interfaces/IProfile';
import { ProfileService } from '../../core/services/profile.service';

@Component({
  selector: 'app-prof',
  templateUrl: './prof.component.html',
  styleUrls: ['./prof.component.css']
})
export class ProfComponent implements OnInit {

  private readonly _ProfileService = inject(ProfileService);

  profileDetails!: Iprofile;
  userId: string = '';





  user = {
    avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Jocelyn',
  };

  ngOnInit(): void {
    const storedUserId = localStorage.getItem('userID');
    if (!storedUserId) {
      console.warn('User ID not found in localStorage!');
      return;
    }

    this.userId = storedUserId;

    this._ProfileService.getUserProfile(this.userId).subscribe({
      next: (res) => {
        console.log("✅ profile", res);
        this.profileDetails = res;
      },
      error: (err) => {
        console.log("❌", err);
      }
    });
  }



}