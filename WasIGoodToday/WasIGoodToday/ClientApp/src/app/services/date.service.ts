import { Injectable } from "@angular/core";

@Injectable()
export class DateService {
  constructor() { }

  //will return a date object for the first monday that occurs
  //after the dateToCheck

  //getDay returns 0-6, 0=sunday, 1=monday
  //setDate takes a number and sets the date to that number of the currently set
  //year and month
  public getFirstMonday(dateToCheck: Date): Date {
    let firstMonday: Date;
    firstMonday = new Date(dateToCheck.getFullYear(), dateToCheck.getMonth(), 1)
    //console.log('in getFirstMonday')
    //console.log(dateToCheck.getDay()) //0
    if (firstMonday.getDay() == 0) {
      firstMonday.setDate(2);
    }
    else if (firstMonday.getDay() != 1) //not Monday
    {
      firstMonday.setDate(9 - dateToCheck.getDay());
    }

    return firstMonday;

  }

}
