import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnsweredQuestion } from '../shared/models/question';

@Component({
  selector: 'app-results',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent {
  score: number = 0;
  totalScore: number = 0;
  percentage: number = 0;
  feedback: string = '';
  answeredQuestions: AnsweredQuestion[] = [];
  isExpanded: boolean = false;
  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { score: number; total: number; answeredQuestions: AnsweredQuestion[] };
    if (state) {
      this.score = state.score;
      this.totalScore = state.total;
      this.percentage = this.totalScore ? (this.score / this.totalScore) * 100 : 0;
      this.feedback = this.generateFeedback(this.percentage);
      this.answeredQuestions = state.answeredQuestions;

    }
  }

  ngOnInit(): void { }

  // In your component.ts file
  toggleQuestion(index: number): void {
    this.answeredQuestions[index].isExpanded = !this.answeredQuestions[index].isExpanded;
  }
  // In your component.ts file
  expandAll(): void {
    this.answeredQuestions.forEach(aq => aq.isExpanded = true);
    this.isExpanded = true;
  }

  collapseAll(): void {
    this.answeredQuestions.forEach(aq => aq.isExpanded = false);
    this.isExpanded = false;
  }
  /**
   * Generates feedback based on the user's score percentage.
   */
  generateFeedback(percentage: number): string {
    if (percentage >= 80) {
      return 'Excellent!';
    } else if (percentage >= 50) {
      return 'Good Job!';
    } else {
      return 'Better luck next time!';
    }
  }

  /**
   * Navigates back to the category selection screen.
   */
  retakeQuiz(): void {
    this.router.navigate(['/']);
  }
}
