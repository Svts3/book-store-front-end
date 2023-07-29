import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../authentication.service';

interface Book {
  id: number;
  imageSource: string;
  title: string;
  genre: string;
  description: string;
  authorName: string;
  price: number;
}

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css'],
})
export class CatalogueComponent implements OnInit {
  books: Book[] = [];
  filteredBooks: Book[] = []; 
  authorFilter: string = '';
  minPriceFilter: number | null = null;
  maxPriceFilter: number | null = null;
  genreFilter: string = '';
  sortOrder: string = 'asc'; 
  constructor(private httpClient: HttpClient, private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.httpClient.get<{ _embedded: { books: Book[] } }>('http://localhost:8080/books/').subscribe(
      (response) => {
        this.books = response._embedded.books;
        this.applyFilters(); 
      },
      (error) => {
        console.error('Error retrieving books:', error);
      }
    );
  }

  applyFilters(): void {
    this.filteredBooks = this.books.filter((book) => {
      let matchesAuthor = true;
      if (this.authorFilter.trim() !== '') {
        matchesAuthor = book.authorName.toLowerCase().includes(this.authorFilter.toLowerCase());
      }

      let matchesPriceRange = true;
      if (this.minPriceFilter !== null && this.maxPriceFilter !== null) {
        matchesPriceRange = book.price >= this.minPriceFilter && book.price <= this.maxPriceFilter;
      }

      let matchesGenre = true;
      if (this.genreFilter !== '') {
        matchesGenre = book.genre === this.genreFilter;
      }

      return matchesAuthor && matchesPriceRange && matchesGenre;
    });

    this.sortByPrice();
  }
  sortByPrice(): void {
    if (this.sortOrder === 'asc') {
      this.filteredBooks.sort((a, b) => a.price - b.price);
    } else if (this.sortOrder === 'desc') {
      this.filteredBooks.sort((a, b) => b.price - a.price);
    }
  }
}
