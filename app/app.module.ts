import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';
import { AuthorListComponent } from './author-list/author-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BookService } from './shared/services/book.service';
import { AuthorService } from './shared/services/author.service';
import { SingleBookComponent } from './single-book/single-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { UserListComponent } from './user-list/user-list.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserService } from './shared/services/user.service';
import { CarTypeListComponent } from './car-type-list/car-type-list.component';
import { EditCarTypeComponent } from './edit-car-type/edit-car-type.component';
import { CarTypeService } from './shared/services/carType.service';



const appRoutes: Routes = [

  { path: 'books', component: BookListComponent },
  { path: 'book', component: SingleBookComponent },
  { path: 'addBook', component: EditBookComponent },
  { path: 'editBook/:bookName', component: EditBookComponent },
  { path: 'authors', component: AuthorListComponent },
  { path: 'users', component: UserListComponent },
  { path: 'addUser', component: EditUserComponent},
  { path: 'editUser/:userName', component: EditUserComponent},
  { path: 'carTypes', component: CarTypeListComponent },
  { path: 'addCarType', component: EditCarTypeComponent},
  { path: 'editCarType/:carModel', component: EditCarTypeComponent},

  // default path - will redirect the current path to 'books'
  { path: '',
    redirectTo: '/carTypes',
    pathMatch: 'full'
  },
 // ** is an angular placeholder for any path that does not exist
 { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    AuthorListComponent,
    PageNotFoundComponent,
    SingleBookComponent,
    EditBookComponent,
    UserListComponent,
    EditUserComponent,
    CarTypeListComponent,
    EditCarTypeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)

  ],
  providers: [
    CarTypeService,
    UserService,
    BookService,
    AuthorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
