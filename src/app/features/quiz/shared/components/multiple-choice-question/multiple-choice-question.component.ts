import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-multiple-choice-question',
  imports: [NgFor],
  standalone: true,
  templateUrl: './multiple-choice-question.component.html',
  styleUrl: './multiple-choice-question.component.scss',
})
export class MultipleChoiceQuestionComponent {
  @Input() question!: any;
  @Input() selectedAnswer: string = '';
  @Output() answerSelected: EventEmitter<string> = new EventEmitter<string>();

  options: string[] = [];

  ngOnInit(): void {
    // Combine correct and incorrect answers and shuffle them using Lodash
    this.options = _.shuffle([
      ...this.question.incorrect_answers,
      this.question.correct_answer,
    ]);
  }

  /**
   * Emits the selected answer.
   */
  selectOption(option: string): void {
    this.selectedAnswer = option;
    this.answerSelected.emit(option);
  }
}
