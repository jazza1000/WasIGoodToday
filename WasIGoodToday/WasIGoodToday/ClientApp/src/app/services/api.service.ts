
import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { month } from "../model/month";
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { week } from "../model/week";



@Injectable()
export class ApiService {
 
  constructor(private _http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {

  }
  saveMonth(month: month) {

    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('Content-Type', 'application/json');
    this._http.post(this.baseUrl + "api/calendar", JSON.stringify(month), { headers: headers }).subscribe();
  }

  //todo create http interceptor and always add headers in there
  getMonthsByYear(year: number): Observable<month[]> {
    let url = `${this.baseUrl}api/calendar/monthsbyyear/${year}`;
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this._http.get(url).pipe(map(
      x => {
        console.log(x);        
        return <month[]>x;
      }));
  }

  getWeeksByYear(year: number): Observable<week[]> {
    let url = `${this.baseUrl}api/calendar/weeksbyyear/${year}`;
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
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

    let url = `${this.baseUrl}api/calendar/${datemonth}/${year}`;

    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
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
}
