import { Component, OnInit } from '@angular/core';
import { DatePipe, getLocaleDayNames } from '@angular/common';
import { week } from '../model/week';
import { weekday } from '../model/weekday';
import { month } from '../model/month';
import { SquareSize } from '../square/enums';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { isNgTemplate } from '@angular/compiler';
import { DateService } from '../services/date.service';


@Component({
  selector: 'app-month-view',
  templateUrl: './month-view.component.html',
  styleUrls: ['./month-view.component.css']
})
export class MonthViewComponent implements OnInit {
  monthNames = ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November","December"];

  days=['Monday','Tuesday','Wednesday','Thursday','Friday']
  months: month[]=[]; //if you don't initialise the array it errors on push()
  startingDate: Date;
  square: SquareSize;
  imgHeight: string;
  imgWidth: string;
  goodDays=0;
  badDays=0;
  unallocatedDays=0;
  currentMonth:month;
  constructor(private route: ActivatedRoute, 
              private apiService: ApiService,
              private dateService: DateService) { }

  ngOnInit() {
  

  this.square= SquareSize.Small;

  this.imgHeight='50px';
  this.imgWidth='50px';

  
  let monthParam =parseInt(this.route.snapshot.paramMap.get('month'));
  let yearParam = parseInt(this.route.snapshot.paramMap.get('year'));


  let monthDate = new month();
    monthDate.weeks = this.getWeeksForDate(new Date(yearParam, monthParam, 1));
  monthDate.year =yearParam;
  monthDate.name= this.monthNames[monthParam];
  this.months.push(monthDate);
  this.currentMonth = monthDate;

  //try fetching month from api
    let month$ = this.apiService.getMonth(this.monthNames[monthParam], yearParam);
    month$.subscribe(
      x => {
        console.log("subscribing to getMonth")
        console.log(x);
        //if we have a month use it,
        //otherwise populate a new one
        if (x)
          this.currentMonth = x;
 


        //explanation of this code:
        //days is the accumulator, or result of the operation that we are performing against every element of weeks
        //currentweek is the particular element we are performing the operation against
        //the concat() into days is the function we are performing on the element
        //the second parameter [], is the initial value of the accumulator

        let allDays = this.currentMonth.weeks.reduce((days, currentWeek) => days.concat(currentWeek.days), []); //,weekday[0]
        console.log(allDays);


        this.goodDays = allDays.reduce((result, item) => {
          item.goodOrNot > 0 ? result++ : result;
          return result;
        }, 0);
        console.log(this.goodDays)
        this.badDays = allDays.reduce((result, item) => {
          item.goodOrNot < 0 ? result++ : result;
          return result;
        }, 0);
        console.log(this.badDays)

        this.unallocatedDays = allDays.reduce((result, item) => {
          item.goodOrNot == 0 ? result++ : result;
          return result;
        }, 0);
        console.log(this.badDays)
      }
      
    );
 
}

  

  getWeeksForDate(dateToCheck:Date): week[]{
    let weeks= [];
    let firstMonday = this.dateService.getFirstMonday(dateToCheck);
    console.log(dateToCheck);
    console.log(firstMonday);
    console.log(firstMonday.getDate());
    var i=1;

    while(i<10 && (firstMonday.getMonth() == dateToCheck.getMonth())){
        
     console.log(firstMonday);
     console.log(firstMonday.getMonth());
     console.log(dateToCheck.getMonth());

        let w = new week();
        
        //we need to create a new Date object, because the one gets changed in the loop
        //and the reference will be updated otherwise.
        w.startingDate= new Date( firstMonday.getFullYear(), firstMonday.getMonth(), firstMonday.getDate());      
        this.populateWeek(w);
        weeks.push(w);

        firstMonday.setDate(firstMonday.getDate()+7) //getDate() returns the day part if a date as a number
        i++;

    }

    return weeks;
  }  
  
  populateWeek(week: week):void{
        for(let i=0;i<5;i++)
        {
            let day = new weekday();
            day.goodOrNot=0;
            day.imagePath="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";

            day.name=this.days[i];
            week.days.push(day)
        }
        week.score=0;
    }
  

    getImage(score:number){
      if (score<2)
        return 'assets/sad.jpg';
  
      if (score>3) 
        return 'assets/happy.jpg';
  
       return 'assets/medium.jpg'; 
    }

    getWeekImage(score:number){
      if (score<2)
        return 'assets/sad.jpg';
  
      if (score>3) 
        return 'assets/happy.jpg';
  
       return 'assets/medium.jpg'; 
    }

    saveMonth(){
      this.apiService.saveMonth(this.currentMonth);
    }

    updateTotals(day: weekday) {
        switch (day.goodOrNot) {

            case -1://bad to unalloc
                this.badDays--;
                this.unallocatedDays++;
                break;
            case 0://unalloc to good
                this.goodDays++;   
                this.unallocatedDays--;
                break;
            case 1: //good to bad
                this.goodDays--;
                this.badDays++;
                
                break;
        }
    }

    squareClicked(day: weekday, week: week) {

        this.updateTotals(day);
      day.goodOrNot++;
          if (day.goodOrNot==2) day.goodOrNot=-1;
      
          switch (day.goodOrNot)
          {
            case 0:
                day.imagePath="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
              break;
            case 1:
              day.imagePath="assets/accept.png";
              break;
            case -1:
              day.imagePath="assets/delete.png";
              break;
          }
        
        week.score = week.days.reduce((sum, item) => {
            sum = sum + item.goodOrNot;
            return sum;
        }, 0);
     }


  }

  



