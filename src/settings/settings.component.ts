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

  ngOnInit(): void {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
      this.darkModeEnabled = true;
      document.body.classList.add('dark-mode');
    }
  }
  toggleNotifications(value: boolean) {
    this.notificationsEnabled = value;
  }

  toggleDarkMode(value: boolean) {
    this.darkModeEnabled = value;
    localStorage.setItem('darkMode', String(value));

    if (value) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }


  }

  get darkModeLabel(): string {
    return this.darkModeEnabled ? '☀️ Light Mode' : '🌙 Dark Mode';
  }




  saveSettings() {
    this.toastr.success('Settings saved successfully!', 'Done');
  }
}
