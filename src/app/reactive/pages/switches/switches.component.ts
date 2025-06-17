import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtil } from '../../../utils/form-utils';

@Component({
  selector: 'app-switches',
  imports: [ ReactiveFormsModule, JsonPipe ],
  templateUrl: './switches.component.html',
  styleUrl: './switches.component.css'
})
export class SwitchesComponent {
  fb = inject( FormBuilder );
  formUtils = FormUtil;

  switchForm : FormGroup = this.fb.group({
    gender: ['M', [Validators.required]],
    notifications: [true],
    terms: [false, Validators.requiredTrue]
  });


onSubmit () {
  if( this.switchForm.invalid ) {
      this.switchForm.markAllAsTouched();
      return;
  }

  console.log(this.switchForm.value);
  
}
}
