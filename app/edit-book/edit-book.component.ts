
import { Component, OnInit } from '@angular/core';
import { BookService } from '../shared/services/book.service';
import { ActivatedRoute } from '@angular/router';
import { AuthorService } from '../shared/services/author.service';
import { Book } from '../shared/models/book.model';
import { AuthorStore } from '../shared/models/author-store.model';
import { Author } from '../shared/models/author.model';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {




authorStore: AuthorStore;

actionMsg: string;
  localParam: string;
  localBook: Book = {'BookName': undefined, 'BookPrice': undefined, 'Author': undefined};

  constructor(private myBookService: BookService, private  myAuthorService: AuthorService, private myActivatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.authorStore = this.myAuthorService.authorInfo;
    this.myActivatedRoute.params.subscribe(params => {
      this.localParam = params.bookName;

      if (params.bookName) {
        this.myBookService.getBookForEdit(params.bookName, (book: Book) => {this.localBook = book; } );
      }
    });
  }

  saveChanges() {
    const callback = (bool: boolean) => {this.actionMsg = (bool) ? 'action success' : 'action fail'; } ;
    this.localBook.Author = this.localBook.Author || this.authorStore.authorList[0];
    // tslint:disable-next-line:max-line-length
    (this.localParam) ? this.myBookService.editBook(this.localBook, this.localParam, callback) : this.myBookService.addBook(this.localBook, callback) ;
  }


  saveAuthor(author: string) {
    this.localBook.Author = this.authorStore.authorList.find(x => x.AuthorName === author);
    console.log(this.localBook);
  }

}
