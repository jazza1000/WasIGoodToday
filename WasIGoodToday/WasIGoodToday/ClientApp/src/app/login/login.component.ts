import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
        private router: Router) { }

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


      //this._userService.checkLogin(username, password).subscribe(usr => this.checkUser(usr));

  }
  checkUser(user: any) {  //TODO change type back to User
      if (!user) {
          this.userNotFound = true;
          return;
      }
      this.router.navigate([this.returnUrl]);
  }

}
