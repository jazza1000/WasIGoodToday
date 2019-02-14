import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-year-selector',
  templateUrl: './year-selector.component.html',
//  styleUrls: ['./year-selector.component.css']
})
export class YearSelectorComponent implements OnInit {

  currentYear: Number; 
  @Input() Years: Number[];

  @Output()
  yearChanged : EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
     this.currentYear= new Date().getFullYear();
     
  }

  onChange(event){
     //console.log(event.target.value);
    event.stopPropagation();
    this.currentYear = event.target.value;
    this.yearChanged.emit(event.target.value);

  }

}
