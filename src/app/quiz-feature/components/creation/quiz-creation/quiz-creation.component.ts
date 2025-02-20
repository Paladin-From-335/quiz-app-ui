import {Component} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {QuestionInputComponent} from '../question-input/question-input.component';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'quiz-creation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    QuestionInputComponent,
    FormsModule,
    NgForOf
  ],
  templateUrl: './quiz-creation.component.html',
  styleUrls: ['./quiz-creation.component.css']
})
export class QuizCreationComponent {
  quizForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.quizForm = this.fb.group({
      quizName: ["", [Validators.required, Validators.minLength(3)]],
      questions: this.fb.array([""])
    });
  }

  get questions(): FormArray {
    return this.quizForm.get("questions") as FormArray;
  }

  addQuestion() {
    const questionForm = this.fb.group({
      questionText: ["", [Validators.required, Validators.minLength(3)]],
      options: this.fb.array(["", ""], [Validators.minLength(2), Validators.maxLength(4)])
    });
    this.questions.push(questionForm);
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
