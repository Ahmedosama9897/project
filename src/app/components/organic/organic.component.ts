import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChatbotComponent } from '../chatbot/chatbot.component';

@Component({
  selector: 'app-organic',
  standalone: true,
  imports: [RouterLink, ChatbotComponent],
  templateUrl: './organic.component.html',
  styleUrl: './organic.component.css'
})
export class OrganicComponent {

}
