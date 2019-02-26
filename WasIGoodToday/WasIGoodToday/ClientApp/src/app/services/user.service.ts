import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from "../model/user";
import { map } from "rxjs/operators";
import { ReplaySubject } from "rxjs";

@Injectable()
export class UserService {
    private currentUser: User;
    private userSubject$= new ReplaySubject<User>();
    constructor(private _http: HttpClient,
        @Inject('BASE_URL') private baseUrl: string) {

    }
    getAuthenticatedUser(): User {
        return this.currentUser;
    }

    getUser(): ReplaySubject<User> {
        return this.userSubject$;
    }
    saveUser(user: User) {
        return this._http.post(this.baseUrl + "api/account/create", JSON.stringify(user))
            .pipe(
                map(x => {
                    console.log(x)
                    this.currentUser = user;
                    this.userSubject$.next(user);
                }));
    }

    checkUser(user: User) {
        return this._http.post(this.baseUrl + "api/account/authenticate", JSON.stringify(user))
            .pipe(
            map(x => {
                    console.log(x);
                if (x) {
                    this.currentUser = user;
                    this.userSubject$.next(user);
                    return this.currentUser;
                }
                })
            );
    }
}