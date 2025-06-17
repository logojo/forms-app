import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { FormUtil } from '../../../utils/form-utils';

@Component({
  selector: 'app-basic',
  imports: [ 
    ReactiveFormsModule,
    JsonPipe 
  ],
  templateUrl: './basic.component.html',
  styleUrl: './basic.component.css'
})
export class BasicComponent {
  fb = inject( FormBuilder );
  formUtils = FormUtil;

  basicForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(10)]],
    inStorage: [0, [Validators.required, Validators.min(0)]]
  });

  //* Puedo crear las funciones para utilizar la clase utils o con una variable
  // isValidField( field: string ) : boolean | null {
  //   return FormUtil.isValidField( this.basicForm, field );
  // }

  // getFieldError( field: string ) : string | null {
  //   return FormUtil.getFieldError( this.basicForm, field );
  // }

 
  onSubmit() {
    if( this.basicForm.invalid ){
      this.basicForm.markAllAsTouched();
      return;
    }

    console.log( this.basicForm.value );

    this.basicForm.reset();
  }
  

}

