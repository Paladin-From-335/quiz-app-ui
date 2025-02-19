import {Component} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {QuestionInputComponent} from '../question-input/question-input.component';

@Component({
  selector: 'quiz-creation',
  imports: [
    ReactiveFormsModule,
    NgForOf,
    QuestionInputComponent
  ],
  templateUrl: './quiz-creation.component.html',
  styleUrl: './quiz-creation.component.css'
})
export class QuizCreationComponent {
  quizForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.quizForm = this.fb.group({
      quizName: ["", [Validators.required, Validators.minLength(3)]],
      questions: this.fb.array([])
    });
    this.addQuestion();
  }

  get questions(): FormArray {
    return this.quizForm.get("questions") as FormArray;
  }

  addQuestion() {
    const questionForm = this.fb.group({
      questionText: ["", [Validators.required, Validators.minLength(3)]],
      options: this.fb.array([])
    });
  }

  removeQuestion(index: number) {
    if (this.questions.length > 1) {
      this.questions.removeAt(index);
    }
  }

  //Tmp before sending to backend
  submitForm() {
    if (this.quizForm.valid) {
      console.log("Quiz Data: ", this.quizForm.value);
    }
  }

  getQuestionFormGroup(index: number): FormGroup {
    return this.questions.at(index) as FormGroup;
  }

}
