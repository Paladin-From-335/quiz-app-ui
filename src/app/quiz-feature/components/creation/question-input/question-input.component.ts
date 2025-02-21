import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {OptionInputComponent} from '../option-input/option-input.component';

@Component({
  selector: 'question-input',
  imports: [
    FormsModule,
    NgForOf,
    OptionInputComponent,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './question-input.component.html',
  styleUrl: './question-input.component.css'
})
export class QuestionInputComponent {
  @Input() questionText: string = "";
  @Output() remove = new EventEmitter<void>();

  options: FormArray<FormControl> = new FormArray<FormControl>([new FormControl(""), new FormControl("")]);

  addOption() {
    if (this.options.length < 4) {
      this.options.push(new FormControl(""));
    }
  }


  getAnswerOptions(index: number): FormGroup {
    return this.options.at(index) as unknown as FormGroup;
  }

  removeOption(index: number) {
    if (this.options.length > 2) {
      this.options.removeAt(index);
    }
  }

}
