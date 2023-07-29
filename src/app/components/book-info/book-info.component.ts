import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CartService } from "../../cart.service";
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.css']
})
export class BookInfoComponent implements OnInit {
  bookId: number = 0;
  book: any;
  reviews: any[] = [];
  averageRate:number = 0;

  constructor(private route: ActivatedRoute, private httpClient: HttpClient, private cartService: CartService,
     private authService:AuthenticationService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.bookId = params['id'];
      this.getBookById(this.bookId);
      this.getBookReviewsById(this.bookId);
    });
    this.calculateAverageRate();
  }

  
  calculateAverageRate(){
    var sum = this.reviews.reduce((acc, value)=>acc + value.rate, 0);
    this.averageRate = sum / this.reviews.length;
  }

  getBookById(id: number) {
    return this.httpClient.get("http://localhost:8080/books/" + id).subscribe(
      (response) => {
        this.book = response;
      }, (error) => {
        console.log(error)
      }
    );
  }
  addToFavourite(book: any) {
    this.authService.getUserFromToken().subscribe(
      (user) => {
        const token = this.authService.getToken();
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
        this.httpClient.post("http://localhost:8080/user/" + user.id + "/books/favourite", { id: book.id }, { headers })
          .subscribe(
            (response) => {
              console.log("Book added to favorites successfully!");
            },
            (error) => {
              console.log("Error adding book to favorites:", error);
            }
          );
      },
      (error) => {
        console.log("Error retrieving user information:", error);
      }
    );
  }
  

  getBookReviewsById(id: number) {
    return this.httpClient.get("http://localhost:8080/books/"+id+"/reviews").subscribe(
      (response: any) => {
        this.reviews = response._embedded.reviews;
      }, (error) => {
        console.log(error)
      }
    );
  }

  hasReviews(): boolean {
    return this.reviews && this.reviews.length > 0;
  }

  addToCart(book: any) {
    this.cartService.addBook(book);
  }
}
