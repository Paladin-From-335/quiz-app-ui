import {Component, Input} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'option-input',
  imports: [
    FormsModule
  ],
  templateUrl: './option-input.component.html',
  styleUrl: './option-input.component.css'
})
export class OptionInputComponent {
  @Input() optionText: string = "";
}
