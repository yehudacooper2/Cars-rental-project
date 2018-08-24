
import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { UserStore } from '../shared/models/user-store.model';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userStore: UserStore;
  localUserName: string;
  localUser: User;
  constructor(private myUserService: UserService) { }

  ngOnInit() {
    this.userStore = this.myUserService.userInfo;

  }
  chooseUser(userName: string): void {
  //  if (this.userStore.userList.find(x => x.UserName === this.localUserName && x.UserRole === 'manager')) {
     this.myUserService.getUser(userName);

     this.localUser = this.userStore.userList.find(x => x.UserName === this.localUserName);
  //  }
  }


}
