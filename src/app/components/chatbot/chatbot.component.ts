import { NgFor, NgIf } from '@angular/common';
import { Product } from '../../core/interfaces/chatbot';
import { ChatbotService } from './../../core/services/chatbot.service';
import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { Icategories } from '../../core/interfaces/icategories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
  imports: [NgIf, NgFor, CarouselModule, FormsModule, RouterLink],
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class ChatbotComponent implements OnInit {
  isOpen = false;
  newMessage = '';
  messages: { sender: string, text: string }[] = [];
  isTyping = false;
  categoriesList: Icategories[] = [];

  @ViewChild('scrollContainer', { static: false }) scrollContainer: ElementRef | undefined;
  @ViewChild('messageContainer', { static: false }) messageContainer: any;

  recommendedItems: Product[] = [];
  originalRecommendedItems: Product[] = [];
  selectedProduct: Product | null = null;

  minPrice: number | null = null;
  maxPrice: number | null = null;
  selectedCategoryId: number | null = null;
  sortOption: string = '';

  constructor(private ChatbotService: ChatbotService) { }

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
          this.originalRecommendedItems = response.products ?? [];
          this.recommendedItems = [...this.originalRecommendedItems];
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
      setTimeout(() => this.showTypingDots(false), 2000);
    }
  }

  applyFilter() {
    let filtered = this.originalRecommendedItems.filter(item => {
      const price = item.Data?.Price_out ?? 0;
      const category = item.Data?.Category_ID;

      const matchesPrice = (!this.minPrice || price >= this.minPrice) &&
        (!this.maxPrice || price <= this.maxPrice);
      const matchesCategory = !this.selectedCategoryId || category === this.selectedCategoryId;

      return matchesPrice && matchesCategory;
    });

    switch (this.sortOption) {
      case 'price-asc':
        filtered.sort((a, b) => (a.Data?.Price_out ?? 0) - (b.Data?.Price_out ?? 0));
        break;
      case 'price-desc':
        filtered.sort((a, b) => (b.Data?.Price_out ?? 0) - (a.Data?.Price_out ?? 0));
        break;
      case 'rating-asc':
        filtered.sort((a, b) => (a.Rating?.AverageRating ?? 0) - (b.Rating?.AverageRating ?? 0));
        break;
      case 'rating-desc':
        filtered.sort((a, b) => (b.Rating?.AverageRating ?? 0) - (a.Rating?.AverageRating ?? 0));
        break;
    }

    this.recommendedItems = filtered;
  }

  resetFilter() {
    this.minPrice = null;
    this.maxPrice = null;
    this.selectedCategoryId = null;
    this.sortOption = '';
    this.recommendedItems = [...this.originalRecommendedItems];
  }

  onMinPriceChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.minPrice = value ? Number(value) : null;
  }

  onMaxPriceChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.maxPrice = value ? Number(value) : null;
  }

  onCategoryChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedCategoryId = value ? Number(value) : null;
  }

  onSortChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.sortOption = value;
    this.applyFilter();
  }

  scrollLeft() {
    this.scrollContainer?.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight() {
    this.scrollContainer?.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }

  openPopup(item: Product) {
    this.selectedProduct = item;
  }

  closePopup() {
    this.selectedProduct = null;
  }

  updateLocalStorage() {
    localStorage.setItem('chatMessages', JSON.stringify(this.messages));
  }

  clearChat() {
    this.messages = [];
    this.recommendedItems = [];
    this.originalRecommendedItems = [];
    this.selectedProduct = null;
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
      return `<div class="chat-msg ${msgClass}"><span class="icon">${icon}</span><span class="text">${msg.text}</span></div>`;
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
      0: { items: 1 },
      500: { items: 2 },
      768: { items: 3 },
      1024: { items: 4 }
    },
    nav: false
  };
}