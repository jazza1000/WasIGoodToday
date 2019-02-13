import { weekday } from './weekday';

export class week {

  days: weekday[] = [];
  score: number;
  weekNumber: number;
  startingDate: Date; //date of Monday in the week
  isComplete: boolean;
}
