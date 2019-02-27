import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
    username: string;
    password: string;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }
    public createUser(userName: string, password: string) {
        
        let user: User = { userName: userName, password: password };
        let user$ = this.userService.saveUser(user).subscribe(
            x => {
                console.log("user created successfully");
                //probably want to actually save the user here somewhere
                this.router.navigate(['dashboard']);

            },
            (err) => {
                console.log('error creating user');
                console.log(err);
            }
        )

    }
}
