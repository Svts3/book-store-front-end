import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  reviews: any;
  books: any;
  userId: string = '';

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    const userEmail = this.authService.getEmailFromToken();
    if (userEmail) {
      this.authService.getUserInfoByEmail(userEmail).subscribe(
        (user) => {
          this.userId = user.id;
          this.firstName = user.firstName;
          this.lastName = user.lastName;
          this.email = user.email;
  
          this.findUserBooksById(this.userId);
          this.findUserReviewsById(this.userId);
        },
        (error) => {
          console.error('Error retrieving user information:', error);
        }
      );
    } else {
      console.error('Email not found in token');
    }
  }
  

  loadUserInfo() {
    const userEmail = this.authService.getEmailFromToken();
    if (userEmail) {
      this.authService.getUserInfoByEmail(userEmail).subscribe(
        (user) => {
          this.userId = user.id;
          this.firstName = user.firstName;
          this.lastName = user.lastName;
          this.email = user.email;
        },
        (error) => {
          console.error('Error retrieving user information:', error);
        }
      );
  }
}

  findUserBooksById(id: string) {

    var token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    this.httpClient.get("http://localhost:8080/user/" + id + "/books", { headers }).subscribe(
      (response: any) => {
        this.books = response._embedded.books;
      }, (error) => {
        console.log(error);
      }
    );
  }
  findUserReviewsById(id: string) {
    var token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    this.httpClient.get("http://localhost:8080/user/" + id + "/reviews", { headers }).subscribe(
      (response: any) => {
        this.reviews = response._embedded.reviews;
      }, (error) => {
        console.log(error);
      }
    );
  }

  editFirstName() {
    const newFirstName = prompt('Enter new first name');
    if (newFirstName) {
      this.firstName = newFirstName;
    }
  }

  editLastName() {
    const newLastName = prompt('Enter new last name');
    if (newLastName) {
      this.lastName = newLastName;
    }
  }

  editEmail() {
    const newEmail = prompt('Enter new email');
    if (newEmail) {
      this.email = newEmail;
    }
  }

  logout() {
    this.authService.removeToken();
    window.location.replace("/home");

  }
}
