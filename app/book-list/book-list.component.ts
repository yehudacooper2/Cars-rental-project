
import { Component, OnInit } from '@angular/core';
import { BookService } from '../shared/services/book.service';
import { BookStore } from '../shared/models/book-store.model';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {


  bookStore: BookStore;
  actionMsg: string;
  constructor(private myBookService: BookService) { }

  ngOnInit() {
    this.bookStore = this.myBookService.bookInfo;
  }

  showBook(bookName: string) {
    this.myBookService.getBook(bookName);
  }

  deleteBook(bookName: string) {
    this.myBookService.deleteBook(bookName).subscribe(
      (res) => {
        if (res) {
          this.myBookService.getBooks();
        }
        this.actionMsg = (res) ? 'delete success' : 'delete fail';

      });



  }
}
