import { Component } from "@angular/core";
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { QuestionInputComponent } from "../question-input/question-input.component";
import {NgForOf} from '@angular/common';

@Component({
  selector: "app-quiz-creation",
  standalone: true,
  templateUrl: "./quiz-creation.component.html",
  styleUrls: ["./quiz-creation.component.css"],
  imports: [QuestionInputComponent, ReactiveFormsModule, NgForOf]
})
export class QuizCreationComponent {
  quizForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.quizForm = this.fb.group({
      quizName: ["", [Validators.required, Validators.minLength(3)]],
      questions: this.fb.array([], Validators.minLength(1)) // Ensure at least one question
    });

    this.addQuestion(); // Ensure the form starts with one question
  }

  get questions(): FormArray {
    return this.quizForm.get("questions") as FormArray;
  }

  addQuestion() {
    const questionForm: FormGroup = this.fb.group({
      questionText: ["", [Validators.required, Validators.minLength(3)]], // Question must be at least 3 chars
      options: this.fb.array([
        this.createOption(),
        this.createOption()
      ], Validators.minLength(2)) // At least 2 options
    });

    this.questions.push(questionForm);
  }

  removeQuestion(index: number) {
    if (this.questions.length > 1) {
      this.questions.removeAt(index);
    }
  }

  createOption(): FormGroup {
    return this.fb.group({
      optionText: ["", [Validators.required, Validators.minLength(1)]] // Option must be at least 1 char
    });
  }

  getQuestionFormGroup(index: number): FormGroup {
    return this.questions.at(index) as FormGroup;
  }

  submitForm() {
    console.log("Form Valid?", this.quizForm.valid);
    console.log("Quiz Data:", this.quizForm.value);
  }

  protected readonly FormGroup = FormGroup;
}
