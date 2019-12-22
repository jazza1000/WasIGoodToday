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
  @Input() IsFinished: boolean;
  @Input() IsToday: boolean;

  @Output()
  click : EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    
  }

    getSquareCSS(): string{
    let css = "";
    
    css += (this.IsFinished) ? " finished" : " unfinished";

    css += (this.IsToday) ? " highlight" : "";

    //could also make this a ternary expression
    if (this.SquareSize == SquareSize.Big)
      css+= " bigsquare";
    else if (this.SquareSize==SquareSize.Small)
      css+= " smallsquare";
    else { 
      console.log("unexpected value for squareSize");
      return "";
        }
     console.log(css);
     return css;
  }
  onclick(event: Event){
    event.stopPropagation();
    this.click.emit("blah");
  }

}
