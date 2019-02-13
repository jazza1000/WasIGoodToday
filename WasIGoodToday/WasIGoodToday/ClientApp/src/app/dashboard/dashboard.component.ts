import { Component, OnInit } from '@angular/core';
import {SquareSize} from '../square/enums';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 public square: SquareSize;
 public month: number= new Date().getMonth();
 public year: number = new Date().getFullYear();
  constructor(public router: Router) { 
    this.square= SquareSize.Big;
  }

  ngOnInit() {
    
  }

  squareClicked(event){
    alert(event);
  }
  navigateTo(path:string): void{
    this.router.navigate([path]);
  }
  navigateToMonth(path:string, year:number, month: number): void{
    this.router.navigate([path, year, month]);
 }

}
