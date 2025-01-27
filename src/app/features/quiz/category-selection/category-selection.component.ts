import { Component } from '@angular/core';
import { QuizService } from '../shared/services/quiz.service';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-category-selection',
  imports: [NgFor],
  standalone: true,
  templateUrl: './category-selection.component.html',
  styleUrl: './category-selection.component.scss'
})
export class CategorySelectionComponent {
  categories: string[] = [];

  constructor(private quizService: QuizService, private router: Router) { }

  ngOnInit(): void {
    this.categories = this.quizService.getCategories();
  }

  /**
   * Navigates to the quiz component with the selected category.
   */
  selectCategory(category: string): void {
    this.router.navigate(['/quiz', category]);
  }
}
