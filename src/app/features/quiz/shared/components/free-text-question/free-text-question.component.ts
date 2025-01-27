import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-free-text-question',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './free-text-question.component.html',
  styleUrl: './free-text-question.component.scss'
})
export class FreeTextQuestionComponent {
  @Input() question!: any;
  @Input() selectedAnswer: string = '';
  @Output() answerSelected: EventEmitter<string> = new EventEmitter<string>();

  userAnswer: string = '';

  ngOnInit(): void {
    this.userAnswer = this.selectedAnswer || '';
  }

  /**
   * Emits the user's input as their answer.
   */
  onInputChange(value: string): void {
    this.userAnswer = value;
    this.answerSelected.emit(this.userAnswer);
  }
}
