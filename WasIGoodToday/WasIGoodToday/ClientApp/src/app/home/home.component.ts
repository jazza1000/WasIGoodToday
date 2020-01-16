import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
    goalSelect = false;
    readyToShow = false;

    createGoal() {
        this.goalSelect = true;
    }

    addGoal(goal: string) {
        alert(goal);
    }
}
