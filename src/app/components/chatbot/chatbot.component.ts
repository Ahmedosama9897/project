import { NgFor, NgIf } from '@angular/common';
import { Recommendeditem } from '../../core/interfaces/recommendeditem';
import { ChatbotService } from './../../core/services/chatbot.service';
import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { Icategories } from '../../core/interfaces/icategories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { FormsModule } from '@angular/forms';
// import { ChatbotService } from './chatbot.service';
@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
  imports: [NgIf, NgFor, CarouselModule, FormsModule],
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class ChatbotComponent implements OnInit {
  isOpen = false;
  newMessage = '';
  messages: { sender: string, text: string }[] = [];
  isTyping = false;
  categoriesList: Icategories[] = [];




  customOptionsCat: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: false,
    dots: true,
    navSpeed: 600,
    margin: 10,
    responsive: {
      0: {
        items: 1
      },
      500: {
        items: 2
      },
      768: {
        items: 3
      },
      1024: {
        items: 4
      }
    },
    nav: false
  };


  @ViewChild('messageContainer', { static: false }) messageContainer: any;



  constructor(private ChatbotService: ChatbotService) { }
  recommendedItems: Recommendeditem[] = [];

  ngOnInit() {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      this.messages = JSON.parse(savedMessages);
    }
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.newMessage = input.value;
  }

  sendMessage() {
    const trimmed = this.newMessage.trim();
    if (trimmed) {
      this.messages.push({ sender: 'user', text: trimmed });
      this.updateLocalStorage();
      this.newMessage = '';

      this.scrollToBottom();

      this.ChatbotService.sendMessage(trimmed).subscribe({
        next: (response: any) => {
          this.messages.push({ sender: 'bot', text: response.reply });
          this.recommendedItems = response.recommended_items;
          this.messages.push({ sender: 'bot', text: response.reply });
          this.updateLocalStorage();
          this.scrollToBottom();
        },


        error: () => {
          this.messages.push({ sender: 'error', text: 'Error connecting to chatbot.' });
          this.updateLocalStorage();
          this.scrollToBottom();
        }
      });



      this.showTypingDots(true);


      setTimeout(() => {
        this.showTypingDots(false);
      }, 2000);
    }
  }




  updateLocalStorage() {
    localStorage.setItem('chatMessages', JSON.stringify(this.messages));
  }

  clearChat() {
    this.messages = [];
    localStorage.removeItem('chatMessages');
  }

  renderMessages(): string {
    return this.messages.map(msg => {
      const msgClass = msg.sender === 'user' ? 'user-msg'
        : msg.sender === 'bot' ? 'bot-msg'
          : 'error-msg';
      const icon = msg.sender === 'user' ? '👤'
        : msg.sender === 'bot' ? '🤖'
          : '❌';
      return `<div class="chat-msg ${msgClass}">
                <span class="icon">${icon}</span>
                <span class="text">${msg.text}</span>
              </div>`;
    }).join('');
  }

  scrollToBottom() {
    setTimeout(() => {
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
    }, 200);
  }

  showTypingDots(isTyping: boolean) {
    this.isTyping = isTyping;
  }
}
