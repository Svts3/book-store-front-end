import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit{

   books: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    this.http.get<any[]>('http://localhost:8080/books').pipe(
      map(response => {
        return response;
      })
    ).subscribe(
      books => {
        this.books = books;
      },
      error => {
        console.error(error);
      }
    );
  }
  
}
