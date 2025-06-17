import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray, FormControl } from '@angular/forms';

import { FormUtil } from '../../../utils/form-utils';

@Component({
  selector: 'app-dynamic',
  imports: [ ReactiveFormsModule, JsonPipe ],
  templateUrl: './dynamic.component.html',
  styleUrl: './dynamic.component.css'
})
export class DynamicComponent {
  fb = inject( FormBuilder );
  formUtils = FormUtil;

  dynamicForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favorites: this.fb.array([ // inicializando con dos inputs
      ['Metal Gear', Validators.required ],
      ['Death Stranding', Validators.required ],
    ],
    Validators.minLength(3))// minimo de elementos en el array
  });

  newFavorite =  this.fb.control('', Validators.required); 

  get favorites () { //* obteniendo el input array del formulario
    return this.dynamicForm.get('favorites') as FormArray;
  }

  addInput() {
    if( this.newFavorite.invalid ) return;

     this.favorites.push(this.fb.control(this.newFavorite.value, Validators.required))
     this.newFavorite.reset();
  }

  deleteInput( index: number) {
     this.favorites.removeAt(index)
     this.newFavorite.reset();
  }

  onSubmit() {
    if( this.dynamicForm.invalid ){
      this.dynamicForm.markAllAsTouched();
      return;
    }

    console.log( this.dynamicForm.value );

    this.dynamicForm.reset();
  }
}
