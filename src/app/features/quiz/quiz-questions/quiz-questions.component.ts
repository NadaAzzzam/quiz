import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';

import * as _ from 'lodash';
import { Router, ActivatedRoute } from '@angular/router';
import { AnsweredQuestion, QuestionComponent } from '../shared/models/question';
import { QuizService } from '../shared/services/quiz.service';
import { QuestionTypeRegistryService } from '../shared/services/question-type-registry.service';
import { MultipleChoiceQuestionComponent } from '../shared/components/multiple-choice-question/multiple-choice-question.component';
import { BooleanQuestionComponent } from '../shared/components/boolean-question/boolean-question.component';
import { FreeTextQuestionComponent } from '../shared/components/free-text-question/free-text-question.component';
import { QuizProgressBarComponent } from '../shared/components/quiz-progress-bar/quiz-progress-bar.component';

@Component({
  selector: 'app-quiz-questions',
  imports: [QuizProgressBarComponent],
  standalone: true,
  templateUrl: './quiz-questions.component.html',
  styleUrls: ['./quiz-questions.component.scss'],
})
export class QuizQuestionsComponent implements AfterViewInit {
  questions: any[] = [];
  currentQuestionIndex: number = 0;
  userAnswers: Map<number, string> = new Map();
  totalScore: number = 0;
  currentScore: number = 0;
  selectedCategory: string = '';

  @ViewChild('questionContainer', { read: ViewContainerRef })
  questionContainer!: ViewContainerRef;
  answeredQuestions: AnsweredQuestion[] = [];

  componentRef!: ComponentRef<QuestionComponent>;

  constructor(
    private quizService: QuizService,
    private questionTypeRegistry: QuestionTypeRegistryService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngAfterViewInit() {
    // Register existing question types
    this.registerQuestionTypes();

    // Retrieve selected category from route parameters
    this.route.params.subscribe(params => {
      this.selectedCategory = params['category'];
      if (this.selectedCategory) {
        this.loadQuestions();
        this.loadQuestionComponent();
      } else {
        // If no category is selected, navigate back to category selection
        this.router.navigate(['/']);
      }
    });
    this.cdr.detectChanges(); // Trigger change detection to avoid ExpressionChangedAfterItHasBeenCheckedError

  }

  /**
   * Registers all existing question types with the registry service.
   */
  registerQuestionTypes(): void {
    this.questionTypeRegistry.registerQuestionType('multiple', MultipleChoiceQuestionComponent);
    this.questionTypeRegistry.registerQuestionType('boolean', BooleanQuestionComponent);
    this.questionTypeRegistry.registerQuestionType('freetext', FreeTextQuestionComponent);
    // Future question types can be registered here or in their respective modules
  }

  /**
   * Loads and sorts questions based on the selected category.
   */
  loadQuestions(): void {
    this.questions = this.quizService.getQuestionsByCategory(this.selectedCategory);
    // Sorting is already handled in the service
    this.totalScore = this.quizService.calculateTotalScore(this.questions);
  }

  /**
    * Dynamically loads the component corresponding to the current question's type.
    */
  loadQuestionComponent(): void {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    const component = this.questionTypeRegistry.getComponent(currentQuestion.type);

    if (!component) {
      throw new Error(`No component registered for question type: ${currentQuestion.type}`);
    }

    // Clear any existing components
    this.questionContainer?.clear();

    // Create the component directly without ComponentFactoryResolver
    this.componentRef = this.questionContainer.createComponent<QuestionComponent>(component);

    // Set input properties
    this.componentRef.instance.question = currentQuestion;
    this.componentRef.instance.selectedAnswer = this.userAnswers.get(this.currentQuestionIndex) || '';

    // Subscribe to output events
    this.componentRef.instance.answerSelected.subscribe((answer: string) => {
      this.userAnswers.set(this.currentQuestionIndex, answer);
      const isCorrect = answer.trim().toLowerCase() === currentQuestion.correct_answer.trim().toLowerCase();

      // Push the answered question to the array
      this.answeredQuestions[this.currentQuestionIndex] = {
        question: currentQuestion.question,
        userAnswer: answer,
        correctAnswer: currentQuestion.correct_answer,
        isCorrect: isCorrect,
        difficulty: currentQuestion.difficulty,
        isExpanded: false // Initially collapsed
      };
    });

  }


  /**
   * Navigates to the next question or submits the quiz.
   */
  nextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.loadQuestionComponent();
    } else {
      this.submitQuiz();
    }
  }

  /**
   * Navigates to the previous question.
   */
  previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.loadQuestionComponent();
    }
  }

  /**
   * Determines if the "Next" button should be disabled.
   */
  isNextDisabled(): boolean {
    return !this.userAnswers.get(this.currentQuestionIndex);
  }

  /**
   * Submits the quiz and navigates to the result page.
   */
  submitQuiz(): void {
    this.currentScore = this.calculateScore();
    // Navigate to the result component with the score
    this.router.navigate(['/result'], { state: { score: this.currentScore, total: this.totalScore, answeredQuestions: this.answeredQuestions } });

  }

  /**
   * Calculates the user's score based on correct answers and question difficulties.
   */
  calculateScore(): number {
    return _.reduce(
      this.questions,
      (score, q, index) => {
        if (
          this.userAnswers.get(index) &&
          this.userAnswers.get(index)!.trim().toLowerCase() === q.correct_answer.trim().toLowerCase()
        ) {
          switch (q.difficulty) {
            case 'easy':
              return score + 1;
            case 'medium':
              return score + 3;
            case 'hard':
              return score + 5;
            default:
              return score;
          }
        }
        return score;
      },
      0
    );
  }
}
