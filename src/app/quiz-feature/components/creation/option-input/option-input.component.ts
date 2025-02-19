import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'option-input',
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './option-input.component.html',
  styleUrl: './option-input.component.css'
})
export class OptionInputComponent {
  @Input() optionText: string = "";
  @Output() remove = new EventEmitter<void>();

  get canRemove() {
    return this.optionText.length > 2;
  }

  removeOption() {
    this.remove.emit();
  }
}
