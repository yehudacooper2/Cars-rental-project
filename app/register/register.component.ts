
import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


actionMsg: string;
  localParam: string;
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

  constructor(private myUserService: UserService,  private myActivatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  saveChanges() {
    const callback = (bool: boolean) => {this.actionMsg = (bool) ? 'action success' : 'action fail'; } ;
    this.localUser.UserRole = 'user';
    // tslint:disable-next-line:max-line-length
    (this.myUserService.addUser(this.localUser, callback)) ;
  }



}
