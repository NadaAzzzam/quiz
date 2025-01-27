import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-quiz-progress-bar',
  imports: [],
  templateUrl: './quiz-progress-bar.component.html',
  styleUrl: './quiz-progress-bar.component.scss'
})
export class QuizProgressBarComponent {
  @Input() current: number = 0;
  @Input() total: number = 0;

  get percentage(): number {
    return this.total ? (this.current / this.total) * 100 : 0;
  }
}
