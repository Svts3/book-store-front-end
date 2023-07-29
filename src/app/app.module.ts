import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { CatalogueComponent } from './components/catalogue/catalogue.component';
import { ROUTES, RouterModule, Routes } from '@angular/router';
import { DiscountPageComponent } from './components/discount-page/discount-page.component';
import { ReviewsPageComponent } from './components/reviews-page/reviews-page.component';
import { NewBooksPageComponent } from './components/new-books-page/new-books-page.component';
import { TopBooksPageComponent } from './components/top-books-page/top-books-page.component';
import { BlogsPageComponent } from './components/blogs-page/blogs-page.component';
import { HowToOrderPageComponent } from './components/how-to-order-page/how-to-order-page.component';
import { AboutUsPageComponent } from './components/about-us-page/about-us-page.component';
import { CartComponent } from './components/cart/cart.component';
import { FavouriteComponent } from './components/favourite/favourite.component';
import { AccountComponent } from './components/account/account.component';
import { routes } from './app-routing.module';
import { DataComponent } from './components/data/data.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SingUpComponent } from './components/sing-up/sing-up.component';
import { HttpClientModule } from '@angular/common/http';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { BookInfoComponent } from './components/book-info/book-info.component';
import { WriteReviewComponent } from './components/write-review/write-review.component';
import { WriteBlogComponent } from './components/write-blog/write-blog.component';
import { AddBookComponent } from './components/add-book/add-book.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    HomeComponent,
    FooterComponent,
    CatalogueComponent,
    DiscountPageComponent,
    ReviewsPageComponent,
    NewBooksPageComponent,
    TopBooksPageComponent,
    BlogsPageComponent,
    HowToOrderPageComponent,
    AboutUsPageComponent,
    CartComponent,
    FavouriteComponent,
    AccountComponent,
    DataComponent,
    SignInComponent,
    SingUpComponent,
    UserInfoComponent,
    BookInfoComponent,
    WriteReviewComponent,
    WriteBlogComponent,
    AddBookComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule

  ],
  exports:[RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
