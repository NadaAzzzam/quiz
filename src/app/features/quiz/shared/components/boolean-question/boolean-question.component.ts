import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-boolean-question',
  imports: [NgFor],
  templateUrl: './boolean-question.component.html',
  styleUrl: './boolean-question.component.scss'
})
export class BooleanQuestionComponent {
  @Input() question!: any;
  @Input() selectedAnswer: string = '';
  @Output() answerSelected: EventEmitter<string> = new EventEmitter<string>();

  options: string[] = ['True', 'False'];

  /**
   * Emits the selected boolean answer.
   */
  selectOption(option: string): void {
    this.selectedAnswer = option;
    this.answerSelected.emit(option);
  }
}
