import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';

import { DatePipe } from '@angular/common';
import { ApiService } from './services/api.service';
import { UserService } from './services/user.service';
import { ApiInterceptor } from './services/api.interceptor';


import { SquareComponent } from './square/square.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { YearViewByMonthComponent } from './year-view-by-month/year-view-by-month.component';
import { YearViewByWeekComponent } from './year-view-by-week/year-view-by-week.component';
import { MonthViewComponent } from './month-view/month-view.component';
import { YearSelectorComponent } from './year-selector/year-selector.component';
import { DateService } from './services/date.service';
import { LoginComponent } from './login/login.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { AuthGuard } from './guards/authentication';
import { StatisticsComponent } from './statistics/statistics.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    SquareComponent,
    DashboardComponent,
    YearViewByMonthComponent,
    YearViewByWeekComponent,
    MonthViewComponent,
    YearSelectorComponent,
    LoginComponent,
    CreateUserComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
        { path: '', canActivate: [AuthGuard],component: HomeComponent, pathMatch: 'full' },
        { path: 'counter', component: CounterComponent },
        { path: 'login', component: LoginComponent },
        { path: 'create-user', component: CreateUserComponent },
        { path: 'statistics', canActivate: [AuthGuard], component: StatisticsComponent},
        { path: 'fetch-data', canActivate: [AuthGuard],component: FetchDataComponent },
      {
          path: 'dashboard', canActivate: [AuthGuard],component: DashboardComponent, children:
          [
            { path: '', redirectTo: 'yearbymonth', pathMatch: 'full' },
          { path: 'yearbymonth', component: YearViewByMonthComponent },
          { path: 'yearbyweek', component: YearViewByWeekComponent },
          { path: 'monthview/:year/:month', component: MonthViewComponent },


        ]
      },
    ])
  ],
    providers: [
        DatePipe,
        ApiService,
        UserService,
        DateService,
        AuthGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ApiInterceptor,
            multi: true
        }],
  bootstrap: [AppComponent]
})
export class AppModule { }
