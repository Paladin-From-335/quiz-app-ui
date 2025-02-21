import {Component, EventEmitter, Input, Output} from "@angular/core";
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: "app-question-input",
  standalone: true,
  templateUrl: "./question-input.component.html",
  styleUrls: ["./question-input.component.css"],
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ]
})
export class QuestionInputComponent {
  @Input() formGroup!: FormGroup; // Receiving FormGroup from parent
  @Output() remove = new EventEmitter<void>();

  get options(): FormArray {
    return this.formGroup.get("options") as FormArray;
  }

  addOption() {
    if (this.options.length < 4) {
      this.options.push(new FormGroup({
        optionText: new FormControl("", [Validators.required, Validators.minLength(1)]) // Ensuring required validation
      }));
    }
  }

  removeOption(index: number) {
    if (this.options.length > 2) {
      this.options.removeAt(index);
    }
  }

  getOptionFormControl(index: number): FormControl {
    return this.options.at(index).get('optionText') as FormControl;
  }
}
