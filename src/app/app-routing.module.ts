import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutUsPageComponent } from './components/about-us-page/about-us-page.component';
import { NewBooksPageComponent } from './components/new-books-page/new-books-page.component';
import { TopBooksPageComponent } from './components/top-books-page/top-books-page.component';
import { BlogsPageComponent } from './components/blogs-page/blogs-page.component';
import { ReviewsPageComponent } from './components/reviews-page/reviews-page.component';
import { HowToOrderPageComponent } from './components/how-to-order-page/how-to-order-page.component';
import { CartComponent } from './components/cart/cart.component';
import { FavouriteComponent } from './components/favourite/favourite.component';
import { AccountComponent } from './components/account/account.component';
import { CatalogueComponent } from './components/catalogue/catalogue.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SingUpComponent } from './components/sing-up/sing-up.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { BookInfoComponent } from './components/book-info/book-info.component';
import { WriteReviewComponent } from './components/write-review/write-review.component';
import { WriteBlogComponent } from './components/write-blog/write-blog.component';
import { AddBookComponent } from './components/add-book/add-book.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
  { path: 'home', component: HomeComponent },
  { path: 'about-us', component: AboutUsPageComponent},
  { path: 'new-books', component:NewBooksPageComponent},
  { path: 'top-books', component:TopBooksPageComponent},
  { path:"add-book", component:AddBookComponent},
  { path: 'blogs', component:BlogsPageComponent},
  { path: 'reviews', component:ReviewsPageComponent},
  { path: 'write-review/:id', component:WriteReviewComponent},
  { path: 'how-to-order', component:HowToOrderPageComponent},
  { path: 'cart', component:CartComponent},
  { path: 'favourite', component:FavouriteComponent},
  { path: 'sign-in', component:SignInComponent},
  { path: 'sign-up', component:SingUpComponent},
  { path: 'user-info', component:UserInfoComponent},
  {path: 'catalogue', component:CatalogueComponent},
  {path:"book-info/:id", component:BookInfoComponent},
  {path:"write-blog", component:WriteBlogComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {


 }
