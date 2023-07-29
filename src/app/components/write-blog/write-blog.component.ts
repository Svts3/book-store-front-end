import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-write-blog',
  templateUrl: './write-blog.component.html',
  styleUrls: ['./write-blog.component.css']
})
export class WriteBlogComponent {


  blogTitle: string = '';
  blogContent: string = '';

  constructor(private authService: AuthenticationService, private http: HttpClient) { }

  userIsLoggedIn() {
    return this.authService.isLoggedIn();
  }

  submitBlog() {
    this.authService.getUserFromToken().subscribe(
      (user) => {
        const blog = {
          title: this.blogTitle,
          content: this.blogContent,
          user: { id: user.id }
        };
  
        this.http.post('http://localhost:8080/blogs/', blog).subscribe(
          (response) => {
            console.log('Blog submitted successfully!', response);
            this.resetForm();
          },
          (error) => {
            console.error('Error submitting blog:', error);
          }
        );
      },
      (error) => {
        console.log('Error getting user:', error);
      }
    );
  }
  

  resetForm() {
    this.blogTitle = '';
    this.blogContent = '';
  }


}
