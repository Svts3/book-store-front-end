import { Component, OnInit } from '@angular/core';
import {DataComponent} from "../data/data.component"
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  books:any[] = [];

  constructor(private http:HttpClient){}

  ngOnInit():void{
    this.findNewBooks();
  }

  findNewBooks(){
    return this.http.get("http://localhost:8080/books/new").subscribe(
      (response:any)=>{
        this.books = response._embedded.books;
      },(error)=>{
        console.log(error);
      }
    )
  }
}
