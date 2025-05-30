import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  notificationsEnabled = true;
  darkModeEnabled = false;

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void { }

  toggleNotifications(value: boolean) {
    this.notificationsEnabled = value;
  }

  toggleDarkMode(value: boolean) {
    this.darkModeEnabled = value;
  }

  saveSettings() {
    this.toastr.success('Settings saved successfully!', 'Done');
  }
}
