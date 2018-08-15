import { Component, OnInit } from '@angular/core';
import { Author } from '../shared/models/author.model';
import { AuthorService } from '../shared/services/author.service';
import { AuthorStore } from '../shared/models/author-store.model';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {



authorStore: AuthorStore;
  constructor(private myAuthorService: AuthorService) { }

  ngOnInit() {
    this.authorStore = this.myAuthorService.authorInfo;
  }


}
