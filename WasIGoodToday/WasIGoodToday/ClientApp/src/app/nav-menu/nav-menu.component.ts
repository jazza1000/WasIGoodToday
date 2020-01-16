import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit{
    user$: Observable<User>;
    isExpanded = false;
    readyToShow = false;
    constructor(private userService: UserService, private router: Router) {
        //TODO get auth user as a subject and login
    }

    ngOnInit(): void {
        this.user$ = this.userService.getUser()

        
    }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
    }
    signOut() {
        this.userService.signOut();
        this.router.navigate(['login']);

    }
}
