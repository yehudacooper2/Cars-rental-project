import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { BookStore } from '../models/book-store.model';


@Injectable()
export class BookService {
    private link = 'http://localhost:59549/api/book';

    bookInfo: BookStore = new BookStore();

    constructor(private myHttpClient: HttpClient) {
        this.getBooks();
    }


    // GET : get all books from server (and save the returned value to a property in this service)
    getBooks(): void {
        this.myHttpClient.get(this.link)
            .subscribe((x: Array<Book>) => { this.bookInfo.bookList = x; });
    }

    // GET : get a specific book (by bookName) from server (and save the returned value to a property in this service)
    getBook(bookName: string): void {
        this.myHttpClient.get(`${this.link}?bookName=${bookName}`)
            .subscribe((x: Book) => { this.bookInfo.singleBook = x; });
    }


      getBookForEdit(bookName: string, callback: (book: Book) => void): void {
   //   getBookForEdit(bookName: string): void {

        this.myHttpClient.get(`${this.link}?bookName=${bookName}`)
            .subscribe((x: Book) => { callback(x); });
     //   .subscribe((x: Book) => this.bookInfo.singleBook = x);
    }

    deleteBook(bookName: string): Observable<boolean> {
        const apiUrl = `${this.link}?bookName=${bookName}`;
        return this.myHttpClient.delete<boolean>(apiUrl);
    }


    addBook(book: Book, callback: (bool: boolean) => void): void {
        // tslint:disable-next-line:max-line-length
        this.myHttpClient.post<boolean> (this.link , JSON.stringify(book), { headers: {'content-type': 'application/json' }}).subscribe(() => {this.getBooks(); callback(true); },
        () => {callback(false); });
    }

    editBook(book: Book, bookName: string, callback: (bool: boolean) => void): void {
        // tslint:disable-next-line:max-line-length
        this.myHttpClient.put<boolean>(`${this.link}?bookName=${bookName}`, JSON.stringify(book), { headers: {'content-type': 'application/json' }}).subscribe(() => {this.getBooks(); callback(true); },
        () => {callback(false); });
    }


}
