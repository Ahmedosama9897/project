import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-prof',
  templateUrl: './prof.component.html',
  styleUrls: ['./prof.component.css']
})
export class ProfComponent implements OnInit {

  user = {
    name: 'Ahmed osama',
    email: 'ahmedos@gmail.com',
    phone: '+20 1157543949',
    address: 'Cairo, Egypt',
    avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Jocelyn',
    bio: 'Front-end developer passionate about Angular and clean UI.'
  };

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void { }

  updateprof() {
    this.toastr.success('Profile updated successfully!', 'Success');
  }
}
