import { Component, OnInit } from '@angular/core';
import { SquareSize } from '../square/enums';
import { month } from '../model/month';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-year-view-by-month',
  templateUrl: './year-view-by-month.component.html',
  styleUrls: ['./year-view-by-month.component.css']
})
export class YearViewByMonthComponent implements OnInit {
  public monthNames=['January', 'February','March','April','May','June','July','August','September','October','November', 'December'];
  
public months: month[]=[];
//  = [
//   {name:"January",year:2018,weeks:[],score:1, isComplete:true},
//   {name:"February",year:2018,weeks:[],score:4, isComplete:true},
//   {name:"March",year:2018,weeks:[],score:2, isComplete:true},
//   {name:"April",year:2018,weeks:[],score:3, isComplete:true},
//   {name:"May",year:2018,weeks:[],score:1, isComplete:false},
//   {name:"June",year:2018,weeks:[],score:4, isComplete:true},
//   {name:"July",year:2018,weeks:[],score:1, isComplete:false},
//   {name:"August",year:2018,weeks:[],score:1, isComplete:true},
//   {name:"September",year:2018,weeks:[],score:4, isComplete:true},
//   {name:"October",year:2018,weeks:[],score:4, isComplete:true},
//   {name:"November",year:2018,weeks:[],score:3, isComplete:true},
//   {name:"December",year:2018,weeks:[],score:1, isComplete:true},
// ];
  
  public square: SquareSize;
  public years: number[] =[2017,2018,2019];
  private months$: Observable<month[]>;
  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {

    this.square= SquareSize.Big;
    let date = new Date()
    
    this.setMonths(date.getFullYear());
    // this.months$ =this.apiService.getMonthsByYear(2018);
    // this.months$.subscribe(
    //   m=> {console.log(m);
    //       this.months=m;}
    // );
  }

  getImage(score:number){
    if (score<2)
      return 'assets/sad.jpg';

    if (score>3) 
      return 'assets/happy.jpg';

     return 'assets/medium.jpg'; 
  }

  squareClicked(item: month)
  {
    //alert (item.startingDate.toDateString());
    let year = item.year;
    let month = this.monthNames.indexOf(item.name);
    this.router.navigate(['dashboard','monthview',year,month])
  
  }

  yearChanged(val: string){

    this.setMonths(parseInt(val));
  }

  private setMonths(year: number):void{
    this.months=[];
    this.months$= this.apiService.getMonthsByYear(year);
    this.months$.subscribe(
      m=> {
          console.log(m);
          //this.months=m;
          //m is an array of months
          //
          let defaultMonths = this.getDefaultMonths(year);
          for (var defaultMonth  of defaultMonths)
          {
              let matchingMonths= (m.filter(x=> x.name==defaultMonth.name))
              if (matchingMonths.length>0){
                matchingMonths[0].isComplete=true; //todo calculate this properly
                this.months.push(matchingMonths[0])
              }
              else
                this.months.push(defaultMonth)
          }
        }
    );
  }

  private getDefaultMonths(year:number):month[]{
    return [
      {name:"January",year:year,weeks:[],score:0, isComplete:false},
      {name:"February",year:year,weeks:[],score:0, isComplete:false},
      {name:"March",year:year,weeks:[],score:0, isComplete:false},
      {name:"April",year:year,weeks:[],score:0, isComplete:false},
      {name:"May",year:year,weeks:[],score:0, isComplete:false},
      {name:"June",year:year,weeks:[],score:0, isComplete:false},
      {name:"July",year:year,weeks:[],score:0, isComplete:false},
      {name:"August",year:year,weeks:[],score:0, isComplete:false},
      {name:"September",year:year,weeks:[],score:0, isComplete:false},
      {name:"October",year:year,weeks:[],score:0, isComplete:false},
      {name:"November",year:year,weeks:[],score:0, isComplete:false},
      {name:"December",year:year,weeks:[],score:0, isComplete:false},
    ]

  }

}
