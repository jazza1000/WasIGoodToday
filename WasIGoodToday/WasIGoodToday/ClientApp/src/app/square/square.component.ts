import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SquareSize } from './enums';


@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent implements OnInit {
  @Input() SquareSize: SquareSize; 
  @Input() Label: string;
  @Input() ImagePath : string;
  @Input() IsFinished : boolean;

  @Output()
  click : EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    
  }

  getSquareCSS():string{
    let finished = (this.IsFinished) ? " finished" : " unfinished";
    if (this.SquareSize==SquareSize.Big)
      return "bigsquare" + finished;
    else if (this.SquareSize==SquareSize.Small)
      return "smallsquare" + finished;
    else { 
      console.log("unexpected value for squareSize");
      return "";
    }
  }
  onclick(event: Event){
    event.stopPropagation();
    this.click.emit("blah");
  }

}
