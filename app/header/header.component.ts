
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
  localAnonimus: string;
  userStore: UserStore;
  localUserName: string;
  localUser: User =
  { 'UserFullName': undefined,
   'UserIdentityNumber': undefined,
   'UserName':  undefined,
   'UserBirthDay': undefined,
   'UserGender':  undefined,
   'UserEmail':  undefined,
   'UserPassword':  undefined,
   'UserRole':  undefined,
   'UserImage':  undefined };
  constructor(private myUserService: UserService) { }

  ngOnInit() {
    this.userStore = this.myUserService.userInfo;

  }
  chooseUser(userName: string): void {
  //  this.userStore.singleUser = null;
 // this.localUser = null;
   if (this.userStore.userList.find(x => x.UserName === this.localUserName )) {
  //   this.myUserService.getUser(userName);
     this.userStore.singleUser = this.userStore.userList.find(x => x.UserName === this.localUserName);
  //   this.localUser = this.userStore.userList.find(x => x.UserName === this.localUserName);
  //  this.userStore.singleUser = this.userStore.userList.find(x => x.UserName === this.localUserName);

  //  }
  //  this.localAnonimus = 'false';
  } else {
    this.userStore.singleUser = { 'UserFullName': undefined,
     'UserIdentityNumber': undefined,
     'UserName':  undefined,
     'UserBirthDay': undefined,
     'UserGender':  undefined,
     'UserEmail':  undefined,
     'UserPassword':  undefined,
     'UserRole':  undefined,
     'UserImage':  undefined };
  }
    //  this.localAnonimus = 'anonimus'; }
}
logOut(): void {
  this.userStore.singleUser = { 'UserFullName': undefined,
  'UserIdentityNumber': undefined,
  'UserName':  undefined,
  'UserBirthDay': undefined,
  'UserGender':  undefined,
  'UserEmail':  undefined,
  'UserPassword':  undefined,
  'UserRole':  'a',
  'UserImage':  undefined };
}
}
