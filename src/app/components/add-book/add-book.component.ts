import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {
  book: any = {}; // Initialize an empty object to store the book data
  selectedImage: string | null = null; // To store the selected image file name

  authors:any = [];

  constructor(private http: HttpClient) { }

  ngOnInit():void{
    this.findAllAuthors();
  }

  onSubmit() {
    this.book.author = { id: this.book.author };
    this.book.imageSource = this.selectedImage;

    const url = 'http://localhost:8080/books/';

    const data = {
      ...this.book
    };

    this.http.post(url, data).subscribe(
      (response) => {
        console.log('Book added successfully:', response);
      },
      (error) => {
        console.error('Error adding book:', error);
      }
    );

    this.resetForm();
  }

  findAuthorById(id:number){

  }

  findAllAuthors(){
    this.http.get("http://localhost:8080/author/").subscribe(
      (response:any)=>{
        this.authors = response._embedded.authors;
      },(error)=>{
        console.log(error);
      }
    );
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file: File = inputElement.files[0];
      this.selectedImage = file.name; 
    }
  }

  resetForm() {
    this.book = {}; 
    this.selectedImage = null; 
  }
}
