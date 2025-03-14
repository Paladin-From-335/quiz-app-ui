import {Component} from "@angular/core";
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {QuestionInputComponent} from "../question-input/question-input.component";
import {NgForOf} from '@angular/common';
import {QuizService} from '../../../services/quiz.service';

@Component({
  selector: "app-quiz-creation",
  standalone: true,
  templateUrl: "./quiz-creation.component.html",
  styleUrls: ["./quiz-creation.component.css"],
  imports: [QuestionInputComponent, ReactiveFormsModule, NgForOf]
})
export class QuizCreationComponent {
  quizForm: FormGroup;

  constructor(private fb: FormBuilder, private quizService: QuizService) {
    this.quizForm = this.fb.group({
      quizName: ["", [Validators.required, Validators.minLength(3)]],
      questions: this.fb.array([], Validators.minLength(1)) // Ensure at least one question
    });

    this.addQuestion(); // Ensure the form starts with one question
  }

  get questions(): FormArray {
    return this.quizForm.get("questions") as FormArray;
  }

  createQuestion() {
    return this.fb.group({
      questionName: ["", [Validators.required, Validators.minLength(3)]], // Question must be at least 3 chars
      options: this.fb.array([
        this.createOption(),
        this.createOption()
      ], Validators.minLength(2)) // At least 2 options
    });
  }

  addQuestion() {
    this.questions.push(this.createQuestion());
  }

  removeQuestion(index: number) {
    if (this.questions.length > 1) {
      this.questions.removeAt(index);
    }
  }

  createOption(): FormGroup {
    return this.fb.group({
      optionName: ["", [Validators.required, Validators.minLength(1)]],
      isCorrect: [false]
    });
  }

  getQuestionFormGroup(index: number): FormGroup {
    return this.questions.at(index) as FormGroup;
  }

  submitForm() {
    console.log("Form Valid?", this.quizForm.valid);
    console.log("Quiz Data (JSON):", JSON.stringify(this.quizForm.value, null, 2));
    this.quizService.createQuiz(this.quizForm.value).subscribe(
      resp => {
        console.log("Quiz created with success", resp);
      });
  }

  protected readonly FormGroup = FormGroup;
}
