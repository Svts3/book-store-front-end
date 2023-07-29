import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: any[] = [];

  constructor() { }

  addBook(book: any) {
    const cartItem = this.cartItems.find(item => item.bookId === book.id);
    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      this.cartItems.push({ bookId: book.id, book: book, quantity: 1 });
    }
  }

  removeBook(bookId: string) {
    this.cartItems = this.cartItems.filter(item => item.bookId !== bookId);
  }

  getCartItems() {
    return this.cartItems;
  }

  getTotalPrice() {
    return this.cartItems.reduce((total, item) => total + item.book.price * item.quantity, 0);
  }
}
