import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/authentication.service';

interface Blog{

  id :number;
  title:string;
  content:string;
  creationDate:Date;
  lastModifiedDate:Date;
  authorName: string;
}


@Component({
  selector: 'app-blogs-page',
  templateUrl: './blogs-page.component.html',
  styleUrls: ['./blogs-page.component.css']
})
export class BlogsPageComponent {

  blogs:Blog[] = [];

  ngOnInit(): void {
    this.getBlogs();
  }

  constructor(private httpClient:HttpClient, private authService:AuthenticationService){}

  writeBlog(blog:Blog){
    this.httpClient.post("http://localhost:8080/blogs/",blog);
  }

  userIsLoggedIn(){
    return this.authService.isLoggedIn();
  }
  getBlogs() {
      this.httpClient.get<{ _embedded: { blogs: Blog[] } }>('http://localhost:8080/blogs/').subscribe(
        (response) => {
          this.blogs = response._embedded.blogs;
          console.log(this.blogs);
        },
        (error) => {
          console.error('Error retrieving books:', error);
        }
      );
    }
}
