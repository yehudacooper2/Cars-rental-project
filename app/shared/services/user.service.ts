import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { UserStore } from '../models/user-store.model';


@Injectable()
export class UserService {
    private link = 'http://localhost:54240/api/user';

    userInfo: UserStore = new UserStore();

    constructor(private myHttpClient: HttpClient) {
        this.getUsers();
    }


    // GET : get all books from server (and save the returned value to a property in this service)
    getUsers(): void {
        this.myHttpClient.get(this.link)
            .subscribe((x: Array<User>) => { this.userInfo.userList = x; });
    }

    // GET : get a specific book (by bookName) from server (and save the returned value to a property in this service)
    getUser(userName: string): void {
        this.myHttpClient.get(`${this.link}?userName=${userName}`)
            .subscribe((x: User) => { this.userInfo.singleUser = x; });
    }


     getUserForEdit(userName: string, callback: (user: User) => void): void {
    //  getBookForEdit(userName: string): void {

        this.myHttpClient.get(`${this.link}?userName=${userName}`)
            .subscribe((x: User) => { callback(x); });
     //   .subscribe((x: Book) => this.bookInfo.singleBook = x);
    }

    deleteUser(userName: string): Observable<boolean> {
        const apiUrl = `${this.link}?userName=${userName}`;
        return this.myHttpClient.delete<boolean>(apiUrl);
    }


    addUser(user: User, callback: (bool: boolean) => void): void {
        // tslint:disable-next-line:max-line-length
        this.myHttpClient.post<boolean> (this.link , JSON.stringify(user), { headers: {'content-type': 'application/json' }}).subscribe(() => {this.getUsers(); callback(true); },
        () => {callback(false); });
    }

    editUser(user: User, userName: string, callback: (bool: boolean) => void): void {
        // tslint:disable-next-line:max-line-length
        this.myHttpClient.put<boolean>(`${this.link}?userName=${userName}`, JSON.stringify(user), { headers: {'content-type': 'application/json' }}).subscribe(() => {this.getUsers(); callback(true); },
        () => {callback(false); });
    }


}
