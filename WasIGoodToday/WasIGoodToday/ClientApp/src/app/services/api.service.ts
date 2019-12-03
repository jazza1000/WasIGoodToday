
import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { month } from "../model/month";
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { week } from "../model/week";
import { UserService } from "./user.service";
import { statistics } from "../model/statistics";



@Injectable()
export class ApiService {
 
    constructor(private _http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
            private userService: UserService
        ) {

    }
    getStatistics() {
        let user = this.getUserName();
        let url = `${this.baseUrl}api/calendar/${user}/statistics`;
      //  let url = `${this.baseUrl}api/calendar/statistics/bob`;
        return this._http.get(url).pipe(map(
            x => {
                console.log(x);
                return <statistics>x;
            }));
    }

  saveMonth(month: month) {
    
      month.username = this.getUserName();

    this._http.post(this.baseUrl + "api/calendar", JSON.stringify(month)).subscribe();
  }

  
    getMonthsByYear(year: number): Observable<month[]> {
        let user = this.getUserName();
    let url = `${this.baseUrl}api/calendar/monthsbyyear/${user}/${year}`;
    return this._http.get(url).pipe(map(
      x => {
        console.log(x);        
        return <month[]>x;
      }));
  }

    getWeeksByYear(year: number): Observable<week[]> {
      let user = this.getUserName();
      let url = `${this.baseUrl}api/calendar/weeksbyyear/${user}/${year}`;
    return this._http.get(url).pipe(map(
      x => {
        console.log('in getweeks by year')
        console.log(x);        
        return <week[]>x;
      }));
  }

  // getWeeksByYear(year: number) Observable<week>{

  // }

  getMonth(datemonth: string, year: number): Observable<month> {
    // var month: month;
    let user = this.getUserName();
      let url = `${this.baseUrl}api/calendar/${user}/${datemonth}/${year}`;

    return this._http.get(url).pipe(map(
      (x: any) => {
        console.log(x);
        if (x) {
          let m = new month();
          //Object.assign(m,x) //note you have to do this to turn the json string into the object you want
          //Object.assign is shallow copy, so need to copy nested properties
          m.name = x.name;
          m.year = x.year;
          //  m.id = x.id;
          m.weeks = [];
          x.weeks.forEach(element => {
            let w = new week();
            Object.assign(w, element)
            m.weeks.push(w)
          });


          console.log(m);
          return m;
        }
      }
    ))


    }

    private getUserName(): string{
        let user = this.userService.getAuthenticatedUser();
        console.log(user);
        return user.userName;
    }
}
