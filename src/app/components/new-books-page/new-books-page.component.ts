import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-books-page',
  templateUrl: './new-books-page.component.html',
  styleUrls: ['./new-books-page.component.css']
})
export class NewBooksPageComponent {


  constructor(private http:HttpClient){}

  newBooks:any[] = [];

  ngOnInit():void{
    this.findNewBooks();
  }

  findNewBooks(){
    return this.http.get("http://localhost:8080/books/new").subscribe(
      (response:any)=>{
        this.newBooks = response._embedded.books;
      },(error)=>{
        console.log(error);
      }
    );
  }

}
