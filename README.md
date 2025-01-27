# Quiz Review Application

This project is a quiz review application that allows users to review their answers to a quiz. Users can expand/collapse individual questions or expand/collapse all questions at once to view details such as their answer, the correct answer, and the difficulty level.

---

## **Task Requirements**

### Functional Requirements
1. Display a list of answered questions.
2. Allow users to toggle (expand/collapse) individual questions to view details.
3. Provide buttons to expand/collapse all questions at once.
4. Show the following details for each question:
   - User's answer.
   - Correct answer.
   - Difficulty level.
   - Whether the answer was correct or incorrect.

### Non-Functional Requirements
1. Use Angular for the frontend.
2. Ensure the UI is responsive and user-friendly.
3. Use proper styling to differentiate between correct and incorrect answers.

---

## **What Has Been Done**

### Code Implementation

#### 1. **Component Logic**
The `QuizReviewComponent` handles the logic for displaying and toggling questions.

```typescript
export class QuizReviewComponent {
  answeredQuestions: { 
    question: string, 
    userAnswer: string, 
    correctAnswer: string, 
    difficulty: string, 
    isCorrect: boolean, 
    isExpanded: boolean 
  }[] = [
    {
      question: 'What is Angular?',
      userAnswer: 'A framework',
      correctAnswer: 'A framework',
      difficulty: 'easy',
      isCorrect: true,
      isExpanded: false
    },
    {
      question: 'What is TypeScript?',
      userAnswer: 'A language',
      correctAnswer: 'A superset of JavaScript',
      difficulty: 'medium',
      isCorrect: false,
      isExpanded: false
    },
    // Add more questions...
  ];

  toggleQuestion(index: number): void {
    this.answeredQuestions[index].isExpanded = !this.answeredQuestions[index].isExpanded;
  }

  expandAll(): void {
    this.answeredQuestions.forEach(aq => aq.isExpanded = true);
  }

  collapseAll(): void {
    this.answeredQuestions.forEach(aq => aq.isExpanded = false);
  }
}
