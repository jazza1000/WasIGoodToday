import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    returnUrl: string;

    isInvalidUserNameAndPassword: boolean;
    isInvalidUserName: boolean;
    isInvalidPassword: boolean;
    userNotFound: boolean;
    logedInUserName: string;
    department: string;
    constructor(private route: ActivatedRoute,
        private router: Router,
        private userService: UserService
    ) { }

    ngOnInit() {
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  validateUser(username: string, password: string) {

      ///Clear the view
      this.isInvalidUserNameAndPassword = false;
      this.isInvalidUserName = false;
      this.isInvalidPassword = false;
      this.userNotFound = false;

      if (!username && !password) {
          this.isInvalidUserNameAndPassword = true;
          return;
      }
      if (!username) {
          this.isInvalidUserName = true;
          return;
      }
      if (!password) {
          this.isInvalidPassword = true;
          return;
      }

      let user: User = { userName: username, password: password };
      this.userService.checkUser(user).subscribe(usr => this.checkUser(usr));

  }
  checkUser(user: User) {  
      if (!user) {
          this.userNotFound = true;
          return;
      }
      this.router.navigate([this.returnUrl]);
  }

}
