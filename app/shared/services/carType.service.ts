import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarType } from '../models/carType.model';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { CarTypeStore } from '../models/carType-store.model';


@Injectable()
export class CarTypeService {
    private link = 'http://localhost:54240/api/carType';

    carTypeInfo: CarTypeStore = new CarTypeStore();

    constructor(private myHttpClient: HttpClient) {
        this.getCarTypes();
    }


    // GET : get all books from server (and save the returned value to a property in this service)
    getCarTypes(): void {
        this.myHttpClient.get(this.link)
            .subscribe((x: Array<CarType>) => { this.carTypeInfo.carTypeList = x; });
    }

    // GET : get a specific book (by bookName) from server (and save the returned value to a property in this service)
    getCarType(carModel: string): void {
        this.myHttpClient.get(`${this.link}?carModel=${carModel}`)
            .subscribe((x: CarType) => { this.carTypeInfo.singleCarType = x; });
    }


     getCarTypeForEdit(carModel: string, callback: (carType: CarType) => void): void {
    //  getBookForEdit(userName: string): void {

        this.myHttpClient.get(`${this.link}?carModel=${carModel}`)
            .subscribe((x: CarType) => { callback(x); });
     //   .subscribe((x: Book) => this.bookInfo.singleBook = x);
    }

    deleteCarType(carModel: string): Observable<boolean> {
        const apiUrl = `${this.link}?carModel=${carModel}`;
        return this.myHttpClient.delete<boolean>(apiUrl);
    }


    addCarType(carType: CarType, callback: (bool: boolean) => void): void {
        // tslint:disable-next-line:max-line-length
        this.myHttpClient.post<boolean> (this.link , JSON.stringify(carType), { headers: {'content-type': 'application/json' }}).subscribe(() => {this.getCarTypes(); callback(true); },
        () => {callback(false); });
    }

    editCarType(carType: CarType, carModel: string, callback: (bool: boolean) => void): void {
        // tslint:disable-next-line:max-line-length
        this.myHttpClient.put<boolean>(`${this.link}?carModel=${carModel}`, JSON.stringify(carType), { headers: {'content-type': 'application/json' }}).subscribe(() => {this.getCarTypes(); callback(true); },
        () => {callback(false); });
    }


}
