import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'option-input',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './option-input.component.html',
  styleUrl: './option-input.component.css'
})
export class OptionInputComponent {
  @Input() textControl!: FormControl;
  @Input() isCorrectControl!: FormControl;
}
