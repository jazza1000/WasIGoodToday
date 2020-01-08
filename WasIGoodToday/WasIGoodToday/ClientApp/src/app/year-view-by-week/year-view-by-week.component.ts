import { Component, OnInit } from '@angular/core';
import { SquareSize } from '../square/enums';
import { week } from '../model/week';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
//import { forEach } from '@angular/router/src/utils/collection';
import { DateService } from '../services/date.service';

@Component({
  selector: 'app-year-view-by-week',
  templateUrl: './year-view-by-week.component.html',
  styleUrls: ['./year-view-by-week.component.css']
})
export class YearViewByWeekComponent implements OnInit {
  public square:SquareSize;
  private weeks$:Observable<week[]>;
 public years: number[] =[2017,2018,2019,2020,2021];
  public weeks: week[]=
  [
    {"weekNumber":1,"days":[],"score":2,"startingDate": new Date(2018,0,1), "isComplete": true},
    {"weekNumber":2,"days":[],"score":2,"startingDate": new Date(2018,0,8), "isComplete": true},
    {"weekNumber":3,"days":[],"score":2,"startingDate": new Date(2018,0,15), "isComplete": true},
    {"weekNumber":4,"days":[],"score":2,"startingDate": new Date(2018,0,22), "isComplete": true},
    {"weekNumber":5,"days":[],"score":2,"startingDate": new Date(2018,0,29), "isComplete": true},
    {"weekNumber":6,"days":[],"score":2,"startingDate": new Date(2018,1,5), "isComplete": true},
    {"weekNumber":7,"days":[],"score":2,"startingDate": new Date(2018,1,12), "isComplete": true},
    {"weekNumber":8,"days":[],"score":2,"startingDate": new Date(2018,1,19), "isComplete": true},
    {"weekNumber":9,"days":[],"score":2,"startingDate": new Date(2018,1,26), "isComplete": true},
    {"weekNumber":10,"days":[],"score":2,"startingDate": new Date(2018,2,5), "isComplete": true},
    {"weekNumber":11,"days":[],"score":2,"startingDate": new Date(2018,2,12), "isComplete": true},
    {"weekNumber":12,"days":[],"score":2,"startingDate": new Date(2018,2,19), "isComplete": true},
    {"weekNumber":13,"days":[],"score":2,"startingDate": new Date(2018,2,26), "isComplete": true},
    {"weekNumber":14,"days":[],"score":2,"startingDate": new Date(2018,3,2), "isComplete": true},
    {"weekNumber":15,"days":[],"score":2,"startingDate": new Date(2018,3,9), "isComplete": true},
    {"weekNumber":16,"days":[],"score":2,"startingDate": new Date(2018,3,16), "isComplete": true},
    {"weekNumber":17,"days":[],"score":2,"startingDate": new Date(2018,3,23), "isComplete": true},
    {"weekNumber":18,"days":[],"score":2,"startingDate": new Date(2018,3,30), "isComplete": true},
    {"weekNumber":19,"days":[],"score":2,"startingDate": new Date(2018,4,7), "isComplete": true},
    {"weekNumber":20,"days":[],"score":2,"startingDate": new Date(2018,4,14), "isComplete": true},
    {"weekNumber":21,"days":[],"score":2,"startingDate": new Date(2018,4,21), "isComplete": true},
    {"weekNumber":22,"days":[],"score":2,"startingDate": new Date(2018,4,28), "isComplete": true},
    {"weekNumber":23,"days":[],"score":2,"startingDate": new Date(2018,5,4), "isComplete": true},
    {"weekNumber":24,"days":[],"score":2,"startingDate": new Date(2018,5,11), "isComplete": true},
    {"weekNumber":25,"days":[],"score":2,"startingDate": new Date(2018,5,18), "isComplete": true},
    {"weekNumber":26,"days":[],"score":3,"startingDate": new Date(2018,5,25), "isComplete": true},
    {"weekNumber":27,"days":[],"score":2,"startingDate": new Date(2018,6,2), "isComplete": true},
    {"weekNumber":28,"days":[],"score":2,"startingDate": new Date(2018,6,9), "isComplete": true},
    {"weekNumber":29,"days":[],"score":2,"startingDate": new Date(2018,6,16), "isComplete": true},
    {"weekNumber":30,"days":[],"score":3,"startingDate": new Date(2018,6,23), "isComplete": true},
    {"weekNumber":31,"days":[],"score":2,"startingDate": new Date(2018,6,30), "isComplete": true},
    {"weekNumber":32,"days":[],"score":2,"startingDate": new Date(2018,7,6), "isComplete": true},
    {"weekNumber":33,"days":[],"score":2,"startingDate": new Date(2018,7,13), "isComplete": true},
    {"weekNumber":34,"days":[],"score":0,"startingDate": new Date(2018,7,20), "isComplete": true},
    {"weekNumber":35,"days":[],"score":2,"startingDate": new Date(2018,7,27), "isComplete": true},
    {"weekNumber":36,"days":[],"score":2,"startingDate": new Date(2018,8,3), "isComplete": true},
    {"weekNumber":37,"days":[],"score":2,"startingDate": new Date(2018,8,10), "isComplete": true},
    {"weekNumber":38,"days":[],"score":2,"startingDate": new Date(2018,8,17), "isComplete": true},
    {"weekNumber":39,"days":[],"score":0,"startingDate": new Date(2018,8,24), "isComplete": true},
    {"weekNumber":40,"days":[],"score":2,"startingDate": new Date(2018,9,1), "isComplete": true},
    {"weekNumber":41,"days":[],"score":2,"startingDate": new Date(2018,9,8), "isComplete": true},
    {"weekNumber":42,"days":[],"score":3,"startingDate": new Date(2018,9,15), "isComplete": true},
    {"weekNumber":43,"days":[],"score":3,"startingDate": new Date(2018,9,22), "isComplete": true},
    {"weekNumber":44,"days":[],"score":2,"startingDate": new Date(2018,9,29), "isComplete": true},
    {"weekNumber":45,"days":[],"score":2,"startingDate": new Date(2018,10,5), "isComplete": true},
    {"weekNumber":46,"days":[],"score":0,"startingDate": new Date(2018,10,12), "isComplete": true},
    {"weekNumber":47,"days":[],"score":2,"startingDate": new Date(2018,10,19), "isComplete": true},
    {"weekNumber":48,"days":[],"score":2,"startingDate": new Date(2018,10,26), "isComplete": true},
    {"weekNumber":49,"days":[],"score":2,"startingDate": new Date(2018,11,3), "isComplete": true},
    {"weekNumber":50,"days":[],"score":2,"startingDate": new Date(2018,11,10), "isComplete": true},
    {"weekNumber":51,"days":[],"score":3,"startingDate": new Date(2018,11,17), "isComplete": true},
    {"weekNumber":52,"days":[],"score":2,"startingDate": new Date(2018,11,24), "isComplete": true}
  ];
  constructor(private router: Router, 
              private apiService: ApiService,
              private dateService: DateService) { }

  ngOnInit() {
    this.square= SquareSize.Small;

    let date = new Date()    
    this.setWeeks(date.getFullYear());

    let defaultWeeks = this.getDefaultWeeks(2018);
    console.log(defaultWeeks);
  }

  
  getImage(score:number){
    if (score<2)
      return 'assets/sad.jpg';

    if (score>3) 
      return 'assets/happy.jpg';

     return 'assets/medium.jpg'; 
  }

  squareClicked(item: week)
  {
    //alert (item.startingDate.toDateString());
    let  d = new Date(item.startingDate); 
    let year = d.getFullYear();
    let month = d.getMonth();
    this.router.navigate(['dashboard','monthview',year,month])

  }

  yearChanged(val){
    this.setWeeks(val);
  }

  formatDate(mydate:Date):string {
    let newDate = new Date(mydate);
    return newDate.toDateString().slice(0,10);
  }

  setWeeks(year:number){
    this.weeks=[];
    this.weeks$ = this.apiService.getWeeksByYear(year)
    this.weeks$.subscribe(
      w=> {
       // this.weeks=x
        let defaultWeeks = this.getDefaultWeeks(year);
        for (var defaultWeek  of defaultWeeks){
          let matchingWeeks= (w.filter(x=> this.formatDate(x.startingDate)===this.formatDate(defaultWeek.startingDate)))
          if (matchingWeeks.length>0){
            matchingWeeks[0].isComplete=true;
            this.weeks.push(matchingWeeks[0]);
          }
          else
            this.weeks.push(defaultWeek);
        }
        console.log('weeks');
        console.log(this.weeks);
      }
    );

    // console.log(this.weeks)
    //  //let w = this.weeks[0];
    //  for (var w of this.weeks){
    //   console.log(w.startingDate.toDateString().slice(0,10))
    //  }
  }

  private getDefaultWeeks(year:number): week[]{
    //get the first monday of that year
    let date = new Date(year,0,1);
    var currentDate= new Date();
    currentDate = this.dateService.getFirstMonday(date);
    let weeks=[];
    let nextYear:number= +year+1;

    let i=0;
    while (currentDate.getFullYear()<(nextYear) && i<100)
    {
      i++;
      console.log(currentDate)
      console.log(currentDate.getFullYear())
      console.log(nextYear)
      let w = new week()
      w.isComplete=false;
      w.score=0;
      w.startingDate = new Date(currentDate);
      w.days=[];

      weeks.push(w);
      currentDate.setDate(currentDate.getDate()+7);
      
    }
    return weeks;
    

  }

}
