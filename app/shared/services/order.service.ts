import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { OrderStore } from '../models/order-store.model';


@Injectable()
export class OrderService {
    private link = 'http://localhost:54240/api/order';

    orderInfo: OrderStore = new OrderStore();

    constructor(private myHttpClient: HttpClient) {
        this.getOrders();
    }


    // GET : get all books from server (and save the returned value to a property in this service)
    getOrders(): void {
        this.myHttpClient.get(this.link)
            .subscribe((x: Array<Order>) => { this.orderInfo.orderList = x; });
    }

    // GET : get a specific book (by bookName) from server (and save the returned value to a property in this service)
    getOrder(carNumber: string): void {
        this.myHttpClient.get(`${this.link}?carNumber=${carNumber}`)
            .subscribe((x: Order) => { this.orderInfo.singleOrder = x; });
    }


      getOrderForEdit(carNumber: string, callback: (order: Order) => void): void {
   //   getBookForEdit(bookName: string): void {

        this.myHttpClient.get(`${this.link}?carNumber=${carNumber}`)
            .subscribe((x: Order) => { callback(x); });
     //   .subscribe((x: Book) => this.bookInfo.singleBook = x);
    }

    deleteOrder(carNumber: string): Observable<boolean> {
        const apiUrl = `${this.link}?carNumber=${carNumber}`;
        return this.myHttpClient.delete<boolean>(apiUrl);
    }


    addOrder(order: Order, callback: (bool: boolean) => void): void {
        // tslint:disable-next-line:max-line-length
        this.myHttpClient.post<boolean> (this.link , JSON.stringify(order), { headers: {'content-type': 'application/json' }}).subscribe(() => {this.getOrders(); callback(true); },
        () => {callback(false); });
    }

    editOrder(order: Order, carNumber: string, callback: (bool: boolean) => void): void {
        // tslint:disable-next-line:max-line-length
        this.myHttpClient.put<boolean>(`${this.link}?carNumber=${carNumber}`, JSON.stringify(order), { headers: {'content-type': 'application/json' }}).subscribe(() => {this.getOrders(); callback(true); },
        () => {callback(false); });
    }


}
