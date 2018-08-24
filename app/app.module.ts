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
import { CarListComponent } from './car-list/car-list.component';
import { EditCarComponent } from './edit-car/edit-car.component';
import { BranchService } from './shared/services/branch.service';
import { CarService } from './shared/services/car.service';
import { OrderListComponent } from './order-list/order-list.component';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { OrderService } from './shared/services/order.service';
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './register/register.component';
import { ChosenCarsComponent } from './chosen-cars/chosen-cars.component';
import { SingleCarComponent } from './single-car/single-car.component';
import { OrderCarComponent } from './order-car/order-car.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { HomeComponent } from './home/home.component';
import { SingleOrderComponent } from './single-order/single-order.component';
import { CarReturnComponent } from './car-return/car-return.component';



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
  { path: 'cars', component: CarListComponent },
  { path: 'addCar', component: EditCarComponent},
  { path: 'editCar/:carNumber', component: EditCarComponent},
  { path: 'orders', component: OrderListComponent },
  { path: 'addOrder', component: EditOrderComponent},
  { path: 'editOrder/:carNumber', component: EditOrderComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'chosenCars', component: ChosenCarsComponent},
  { path: 'car', component: SingleCarComponent},
  { path: 'orderCar', component: OrderCarComponent},
  { path: 'userOrders', component: UserOrdersComponent},
  { path: 'home', component: HomeComponent},
  { path: 'order', component: SingleOrderComponent},
  { path: 'carReturn', component: CarReturnComponent},






  // default path - will redirect the current path to 'books'
  { path: '',
    redirectTo: '/carReturn',
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
    EditCarTypeComponent,
    CarListComponent,
    EditCarComponent,
    OrderListComponent,
    EditOrderComponent,
    HeaderComponent,
    RegisterComponent,
    ChosenCarsComponent,
    SingleCarComponent,
    OrderCarComponent,
    UserOrdersComponent,
    HomeComponent,
    SingleOrderComponent,
    CarReturnComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)

  ],
  providers: [
    OrderService,
    CarService,
    BranchService,
    CarTypeService,
    UserService,
    BookService,
    AuthorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
