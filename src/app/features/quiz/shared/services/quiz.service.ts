import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { QUESTIONS } from '../consts/quiz-data.const';
import { Question } from '../models/question';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private questions: Question[] = QUESTIONS;

  constructor() { }

  /**
   * Retrieves unique categories from the questions array using Set.
   */
  getCategories(): string[] {
    const categories = this.questions.map(q => q.category);
    return Array.from(new Set(categories));
  }

  /**
   * Retrieves questions based on selected category and sorts them by difficulty.
   * Sorting order: easy → medium → hard.
   */
  getQuestionsByCategory(category: string): Question[] {
    const difficultyOrder = new Map<string, number>([
      ['easy', 1],
      ['medium', 2],
      ['hard', 3]
    ]);

    const questions =  this.questions
      .filter(q => q.category === category)
      .sort((a, b) => difficultyOrder.get(a.difficulty)! - difficultyOrder.get(b.difficulty)!);
      return questions;

  }

  /**
   * Calculates the total possible score based on difficulty weights.
   */
  calculateTotalScore(questions: Question[]): number {
    const difficultyPoints = new Map<string, number>([
      ['easy', 1],
      ['medium', 3],
      ['hard', 5]
    ]);

    return questions.reduce((acc, q) => acc + (difficultyPoints.get(q.difficulty) || 1), 0);
  }

  /**
   * Calculates the user's score based on correct answers and difficulty weights.
   */
  calculateResults(questions: Question[], answers: Map<number, string>): number {
    const difficultyPoints = new Map<string, number>([
      ['easy', 1],
      ['medium', 3],
      ['hard', 5]
    ]);

    let score = 0;
    questions.forEach((q, index) => {
      const userAnswer = answers.get(index);
      if (userAnswer && userAnswer.trim().toLowerCase() === q.correct_answer.trim().toLowerCase()) {
        score += difficultyPoints.get(q.difficulty) || 1;
      }
    });

    return score;
  }
}
