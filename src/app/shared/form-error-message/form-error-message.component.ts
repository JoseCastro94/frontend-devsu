import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-error-message',
  templateUrl: './form-error-message.component.html',
  styleUrls: ['./form-error-message.component.css']
})
export class FormErrorMessageComponent {
  @Input('control') control: any;
  @Input('inputRequired') inputRequired: string = '';
  @Input('inputMin') inputMin: string = '';
}
