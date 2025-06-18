import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, ValidationErrors, AbstractControl } from '@angular/forms';
import { FormUtil } from '../../../utils/form-utils';

@Component({
  selector: 'app-register',
  imports: [ ReactiveFormsModule, JsonPipe ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
    fb = inject( FormBuilder );
    formUtils = FormUtil;

    registerForm : FormGroup = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(this.formUtils.namePattern)]],
      email: ['', [Validators.required, Validators.pattern(this.formUtils.emailPattern)], [FormUtil.checkingServeResponse]],
      username: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this.formUtils.notOnlySpacesPattern), FormUtil.checkingUsername]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm: ['', [Validators.required]],
    }, {
      validators: [FormUtil.passConfirmValid('password','confirm')]
    });


    onSubmit() {
    if( this.registerForm.invalid ){
      this.registerForm.markAllAsTouched();
      return;
    }

    console.log( this.registerForm.value );

    this.registerForm.reset();
  }
}
