import { EventEmitter } from '@angular/core';

export interface QuestionComponent {
  question: any;
  selectedAnswer: string;
  answerSelected: EventEmitter<string>;
}

export interface Question {
  category: string;
  question: string;
  type: string;
  difficulty: string;
  correct_answer: string;
  incorrect_answers?: string[];
}
