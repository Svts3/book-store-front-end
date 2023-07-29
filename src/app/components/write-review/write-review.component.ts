import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-write-review',
  templateUrl: './write-review.component.html',
  styleUrls: ['./write-review.component.css']
})
export class WriteReviewComponent implements OnInit {
  formData: {
    bookTitle: string;
    review: string;
    rating: string;
  };
  bookId: number = 0;
  book: any;

  bookReviewForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private authService: AuthenticationService
  ) {
    this.formData = {
      bookTitle: '',
      review: '',
      rating: ''
    };

    this.bookReviewForm = this.formBuilder.group({
      review: ['', Validators.required],
      rating: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.bookId = params['id'];
      this.findBookById(this.bookId);
    });
  }

  submitReview() {
    var email = this.authService.getEmailFromToken();
    var token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    this.authService.getUserInfoByEmail(email).subscribe((user) => {
      const review = {
        content: this.bookReviewForm.get('review')?.value,
        rate: this.bookReviewForm.get('rating')?.value,
        book: { id: this.bookId },
        user: { id: user.id }
      };
      console.log(review);
      this.httpClient.post("http://localhost:8080/reviews/", review, { headers }).subscribe(
        (response) => {
          console.log(response);
          this.bookReviewForm.reset();
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }
  

  findBookById(id: number) {
    this.httpClient.get("http://localhost:8080/books/" + id).subscribe(
      (response) => {
        this.book = response;
        this.formData.bookTitle = this.book.title;

        this.bookReviewForm.get('bookTitle')?.setValue(this.book.title);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
