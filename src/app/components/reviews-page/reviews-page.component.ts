import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';


interface Review{
  id:number;
  content:string;
  rate:number;
  book:string;
  user:string;
  creationDate:Date;
  lastModifiedDate:Date;
}
@Component({
  selector: 'app-reviews-page',
  templateUrl: './reviews-page.component.html',
  styleUrls: ['./reviews-page.component.css']
})
export class ReviewsPageComponent {
  reviews:Review[] = [];
  bookTitle:string = ''

  ngOnInit(): void {
    this.getBooks();
  }

  constructor(private httpClient:HttpClient){}

  getBooks() {
      this.httpClient.get<{ _embedded: { reviews: Review[] } }>('http://localhost:8080/reviews/').subscribe(
        (response) => {
          this.reviews = response._embedded.reviews;
          console.log(this.reviews);
        },
        (error) => {
          console.error('Error retrieving books:', error);
        }
      );
    }
}
