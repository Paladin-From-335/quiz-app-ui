import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {OptionInputComponent} from '../option-input/option-input.component';

@Component({
  selector: 'question-input',
  imports: [
    FormsModule,
    NgForOf,
    OptionInputComponent
  ],
  templateUrl: './question-input.component.html',
  styleUrl: './question-input.component.css'
})
export class QuestionInputComponent {
  @Input() questionText: string = "";
  @Output() remove = new EventEmitter<void>();

  options: string[] = ["", ""];

  addOption() {
    this.options.push("");
  }

  removeOption(index: number) {
    if (this.options.length > 2) {
      this.options.splice(index, 1);
    }
  }
}
