Angular Quiz Application
A modern Angular application showcasing a dynamic quiz interface with category selection, question flow, and result calculation. The application supports multiple question types and is designed for future extensibility.

🚀 Demo
screen-capture.webm

🚀 Features
Category Selection: Choose from available quiz categories.

Dynamic Question Rendering: Supports multiple question types (multiple-choice, boolean, free-text).

Undo/Redo Functionality: Navigate between questions with "Previous" and "Next" buttons.

Result Calculation: Calculate scores based on question difficulty.

Future Extensibility: Easily add new question types without modifying core logic.

Responsive Design: Works seamlessly on all devices.

🛠️ Technologies Used
Angular 17+

Lodash (for utility functions)

RxJS (for reactive programming)

TypeScript

Angular Material (optional for UI components)

📋 Prerequisites
Node.js (version 18.x or higher)

npm (version 9.x or higher)

Angular CLI (version 17.x)

🔧 Installation
Clone the repository:

bash
Copy
git clone [repository-url]
Install dependencies:

bash
Copy
npm install
Run the development server:

bash
Copy
ng serve
Open your browser and navigate to http://localhost:4200.

🏗️ Project Structure
Copy
src/
├── app/
│   ├── category-selection/          # Category selection screen
│   ├── quiz-questions/              # Quiz question flow and result calculation
│   ├── multiple-choice-question/    # Multiple-choice question component
│   ├── boolean-question/            # Boolean question component
│   ├── free-text-question/          # Free-text question component
│   ├── services/
│   │   └── quiz.service.ts          # Quiz data management
│   │   └── question-type-registry.service.ts  # Dynamic component registry
│   └── store/                       # Optional: State management with NgRx
├── assets/
│   └── quiz-data.json               # Quiz questions in JSON format
└── styles/                          # Global styles
💡 Usage
Category Selection
Select a category from the available options to start the quiz.

Question Flow
Answer questions based on the selected category.

Questions are sorted by difficulty (easy → medium → hard).

Input controls are dynamically rendered based on the question type:

Multiple-choice: Radio buttons.

Boolean: True/False buttons.

Free-text: Text area.

Navigation
Use the "Previous" and "Next" buttons to navigate between questions.

The "Next" button is disabled until an answer is selected.

Result Calculation
After completing all questions, view your score:

Easy: 1 point.

Medium: 3 points.

Hard: 5 points.

🛠️ Store Implementation (Optional)
Copy
🏗️ feat: Add NgRx store implementation

- Configure store for quiz state management
- Set up actions, reducers, and selectors
- Implement undo/redo functionality for question navigation
✨ Dynamic Question Rendering
Copy
✨ feat: Add dynamic component rendering

- Create a registry for question types
- Use ComponentFactoryResolver to load components dynamically
- Support future question types without modifying core logic
🔧 Adding New Question Types
Create a new component for the question type (e.g., NewTypeQuestionComponent).

Register the new component in the QuestionTypeRegistryService:

typescript
Copy
this.register('newtype', NewTypeQuestionComponent);
The application will automatically render the new question type.

📋 Example Quiz Data
The quiz data is stored in src/assets/quiz-data.json and follows this structure:

json
Copy
[
  {
    "category": "History",
    "type": "multiple",
    "difficulty": "hard",
    "question": "Who was the leader of the Mongol Empire in the 13th century?",
    "correct_answer": "Genghis Khan",
    "incorrect_answers": ["Kublai Khan", "Tamerlane", "Atilla the Hun"]
  },
  {
    "category": "History",
    "type": "boolean",
    "difficulty": "easy",
    "question": "The Earth revolves around the Sun in approximately 365 days.",
    "correct_answer": "True",
    "incorrect_answers": ["False"]
  }
]
🚀 Future Enhancements
Progress Bar: Show the user's progress through the quiz.

Timer: Add a timer for each question or the entire quiz.

API Integration: Fetch quiz data from an external API.

User Authentication: Allow users to log in and save their quiz results.

📜 License
This project is licensed under the MIT License. See the LICENSE file for details.

📧 Contact
For questions or feedback, please contact:

Your Name

Email: your.email@example.com

GitHub: your-github-profile

Enjoy building and extending the Angular Quiz Application! 🚀

This README follows the same syntax and structure as your example, making it visually appealing and easy to read. Let me know if you need further adjustments!
