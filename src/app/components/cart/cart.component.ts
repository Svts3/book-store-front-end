import { Component, OnInit } from '@angular/core';
import { CartService } from "../../cart.service";
import { FormsModule } from '@angular/forms'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;
  userId :any;

  constructor(private cartService: CartService, private httpClient:HttpClient, private authService:AuthenticationService) { }

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    this.totalPrice = this.cartService.getTotalPrice();
  }

    
  checkout(){
    var userEmail = this.authService.getEmailFromToken();
    var books: any[] = [];
    
    this.authService.getUserInfoByEmail(userEmail).subscribe(
      (response) => {
        var user = response;
        console.log(user);
        
        this.cartItems.forEach((i) => {
          books.push({ id: i.bookId });
        });
    
        console.log(this.cartItems);
    
        const token = this.authService.getToken();
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    
        this.httpClient.patch("http://localhost:8080/user/" + user.id, books, { headers }).subscribe(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
    
    
  }

  removeItem(bookId: string) {
    this.cartService.removeBook(bookId);
    this.cartItems = this.cartService.getCartItems();
    this.totalPrice = this.cartService.getTotalPrice();
  }

  updateQuantity(cartItem: any) {
    if (cartItem.quantity < 1) {
      cartItem.quantity = 1;
    }
    this.totalPrice = this.cartService.getTotalPrice();
  }
}
