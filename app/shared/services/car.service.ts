import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from '../models/car.model';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { CarStore } from '../models/car-store.model';


@Injectable()
export class CarService {
    private link = 'http://localhost:54240/api/car';

    carInfo: CarStore = new CarStore();

    constructor(private myHttpClient: HttpClient) {
        this.getCars();
    }


    // GET : get all books from server (and save the returned value to a property in this service)
    getCars(): void {
        this.myHttpClient.get(this.link)
            .subscribe((x: Array<Car>) => { this.carInfo.carList = x; });
    }

    // GET : get a specific book (by bookName) from server (and save the returned value to a property in this service)
    getCar(carNumber: string): void {
        this.myHttpClient.get(`${this.link}?carNumber=${carNumber}`)
            .subscribe((x: Car) => { this.carInfo.singleCar = x; });
    }


      getCarForEdit(carNumber: string, callback: (car: Car) => void): void {
   //   getBookForEdit(bookName: string): void {

        this.myHttpClient.get(`${this.link}?carNumber=${carNumber}`)
            .subscribe((x: Car) => { callback(x); });
     //   .subscribe((x: Book) => this.bookInfo.singleBook = x);
    }

    deleteCar(carNumber: string): Observable<boolean> {
        const apiUrl = `${this.link}?carNumber=${carNumber}`;
        return this.myHttpClient.delete<boolean>(apiUrl);
    }


    addCar(car: Car, callback: (bool: boolean) => void): void {
        // tslint:disable-next-line:max-line-length
        this.myHttpClient.post<boolean> (this.link , JSON.stringify(car), { headers: {'content-type': 'application/json' }}).subscribe(() => {this.getCars(); callback(true); },
        () => {callback(false); });
    }

    editCar(car: Car, carNumber: string, callback: (bool: boolean) => void): void {
        // tslint:disable-next-line:max-line-length
        this.myHttpClient.put<boolean>(`${this.link}?carNumber=${carNumber}`, JSON.stringify(car), { headers: {'content-type': 'application/json' }}).subscribe(() => {this.getCars(); callback(true); },
        () => {callback(false); });
    }


}
