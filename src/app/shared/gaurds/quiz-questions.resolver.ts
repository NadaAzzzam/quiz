// quiz-questions.resolver.ts
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { QuizService } from '../../features/quiz/shared/services/quiz.service';

export const quizQuestionsResolver: ResolveFn<any[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const quizService = inject(QuizService);
  const category = route.paramMap.get('category');

  if (!category) {
    throw new Error('Category is required');
  }

  const questions = quizService.getQuestionsByCategory(category);

  if (questions.length === 0) {
    console.warn(`No questions found for category: ${category}`);
    // Optionally, you can throw an error or return an empty array
    return [];
  }

  return questions;
};
