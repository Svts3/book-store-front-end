import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-top-books-page',
  templateUrl: './top-books-page.component.html',
  styleUrls: ['./top-books-page.component.css']
})
export class TopBooksPageComponent {

  topBooks: any;
  averageRate:number = 0;

  constructor(private httpClient:HttpClient){}

  ngOnInit():void{
    this.findTopBooks();
  }


  findTopBooks(){
    this.httpClient.get("http://localhost:8080/books/top").subscribe(
      (response:any)=>{
        this.topBooks = response._embedded.books;
      },(error)=>{
        console.log(error);
      }
    );
  }



}
