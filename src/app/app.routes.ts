import { Routes } from '@angular/router';
import { authGuard } from './core/gaurds/auth.guard';
import { quizQuestionsResolver } from './shared/gaurds/quiz-questions.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/quiz/category-selection/category-selection.component').then(m => m.CategorySelectionComponent)
  },
  {
    path: 'quiz/:category',
    loadComponent: () => import('./features/quiz/quiz-questions/quiz-questions.component').then(m => m.QuizQuestionsComponent),
    resolve: {
      questions: quizQuestionsResolver, // Use the resolver function
    },
  },
  {
    path: 'result',
    loadComponent: () => import('./features/quiz/results/results.component').then(m => m.ResultsComponent)
  },
  {
    path: 'history',
    loadChildren: () => import('./features/history/history.routes').then(m => m.HISTORY_ROUTES), // Lazy-load routes (not modules)
    canActivate: [authGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES), // Lazy-load routes (not modules)
  },
  { path: '**', redirectTo: '' } // Wildcard route redirects to category selection

];
