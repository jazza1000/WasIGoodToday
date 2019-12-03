import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../services/api.service';
import { statistics } from '../model/statistics';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
    statistics$: Observable<statistics> = this.apiService.getStatistics();
  constructor(private apiService: ApiService) { }

    ngOnInit() {
      //  let statistics$ = this.apiService.getStatistics();
        
        
    }

    fetch() {
        this.statistics$ = this.apiService.getStatistics();
    }

}
