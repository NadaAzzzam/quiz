import { Injectable, Type } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuestionTypeRegistryService {
  private registry = new Map<string, Type<any>>();

  /**
   * Registers a new question type with its corresponding component.
   * @param type The unique identifier for the question type.
   * @param component The component that handles the rendering of this question type.
   */
  registerQuestionType(type: string, component: Type<any>): void {
    if (this.registry.has(type)) {
      console.warn(`Question type "${type}" is already registered. Overwriting.`);
    }
    this.registry.set(type, component);
  }

  /**
   * Retrieves the component associated with the given question type.
   * @param type The question type identifier.
   * @returns The component class if found; otherwise, undefined.
   */
  getComponent(type: string): Type<any> | undefined {
    return this.registry.get(type);
  }

  /**
   * Checks if a question type is registered.
   * @param type The question type identifier.
   * @returns True if registered; otherwise, false.
   */
  isRegistered(type: string): boolean {
    return this.registry.has(type);
  }
}
