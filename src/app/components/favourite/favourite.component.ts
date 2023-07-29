import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})


export class FavouriteComponent {
  
  favouriteBooks:any[] = [];
  constructor(private httpClient:HttpClient, private authService:AuthenticationService){}


  ngOnInit():void{
    this.getFavouriteBooks();
  }


  getFavouriteBooks() {
    this.authService.getUserFromToken().subscribe(
      (user) => {
        // The user variable is now defined inside the subscribe callback
        const token = this.authService.getToken();
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
        this.httpClient.get("http://localhost:8080/user/" + user.id + "/books/favourite", { headers }).subscribe(
          (response: any) => {
            this.favouriteBooks = response._embedded.books;
            console.log(this.favouriteBooks);
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


}
