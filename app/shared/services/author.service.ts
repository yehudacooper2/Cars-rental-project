
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Author } from '../models/author.model';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { AuthorStore } from '../models/author-store.model';


@Injectable()
export class AuthorService {
    private link = 'http://localhost:59549/api/author';
    authorInfo: AuthorStore = new AuthorStore();

    constructor(private myHttpClient: HttpClient) {
        this.initAuthors();
     }

    initAuthors(): void {
        this.myHttpClient.get(this.link)
            .subscribe((x: Array<Author>) => { this.authorInfo.authorList = x; });
    }

}
