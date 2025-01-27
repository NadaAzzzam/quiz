// history.routes.ts
import { Routes } from '@angular/router';
import { quizQuestionsResolver } from '../../shared/gaurds/quiz-questions.resolver';

export const QUIZ_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./category-selection/category-selection.component').then(m => m.CategorySelectionComponent)
  },
  {
    path: 'quiz/:category',
    loadComponent: () => import('./quiz-questions/quiz-questions.component').then(m => m.QuizQuestionsComponent),
    resolve: {
      questions: quizQuestionsResolver, // Use the resolver function
    },
  },
  {
    path: 'result',
    loadComponent: () => import('./results/results.component').then(m => m.ResultsComponent)
  },
];
