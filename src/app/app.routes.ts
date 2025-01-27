import { Routes } from '@angular/router';
import { authGuard } from './core/gaurds/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/quiz/quiz.routes').then(m => m.QUIZ_ROUTES), // Lazy-load routes (not modules)
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
