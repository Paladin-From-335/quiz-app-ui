import {Component, EventEmitter, Input, Output} from "@angular/core";
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from '@angular/common';
import {OptionInputComponent} from '../option-input/option-input.component';

@Component({
  selector: "app-question-input",
  standalone: true,
  templateUrl: "./question-input.component.html",
  styleUrls: ["./question-input.component.css"],
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    OptionInputComponent
  ]
})
export class QuestionInputComponent {
  @Input() formGroup!: FormGroup; // Receiving FormGroup from parent
  @Input() textControl!: FormControl; // The "optionText" control
  @Input() isCorrectControl!: FormControl; // The "isCorrect" control
  @Output() remove = new EventEmitter<void>();

  get options(): FormArray {
    return this.formGroup.get("options") as FormArray;
  }

  createOption(): FormGroup {
    return new FormGroup({
      optionName: new FormControl("", [Validators.required, Validators.minLength(1)]),
      isCorrect: new FormControl(false),
    });
  }

  addOption(): void {
    if (this.options.length < 4) {
      this.options.push(this.createOption());
    }
  }

  removeOption(index: number) {
    if (this.options.length > 2) {
      this.options.removeAt(index);
    }
  }

  getOptionText(index: number): FormControl {
    return this.options.at(index).get('optionName') as FormControl;
  }

  getIsCorrectOption(index: number): FormControl {
    return this.options.at(index).get('isCorrect') as FormControl;
  }
}
