import { Component, OnInit } from '@angular/core';
import { BookStore } from '../shared/models/book-store.model';
import { BookService } from '../shared/services/book.service';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.css']
})
export class SingleBookComponent implements OnInit {

  bookStore: BookStore;
  constructor(private myBookService: BookService) { }

  ngOnInit() {
    this.bookStore = this.myBookService.bookInfo;
  }

}
