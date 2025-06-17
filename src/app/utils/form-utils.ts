import { FormArray, FormGroup, ValidationErrors } from "@angular/forms";

export class FormUtil {

  static getTextErrors( errors : ValidationErrors, field: string | number, isArray = false ) {
     for( const key of Object.keys(errors) ) {
        switch(key) {
          case 'required':
             if( typeof field  === 'number' )
                return `Este campo es requerido`
            return `El campo ${field} es requerido`;
          case 'minlength':
            if( isArray )
                return `El campo ${field} debe tener minimo ${errors['minlength'].requiredLength } elementos`
            return `El campo ${field} debe contener minimo ${errors['minlength'].requiredLength } caracteres`;
          case 'min':
            return `el valor minimo es ${errors['min'].min } `;
          default: return null;
        }
   }

     return null;
  }

  static isValidField( form: FormGroup,  field: string ) : boolean | null {
    return (form.controls[field].errors &&  form.controls[field].touched);
  }

  static getFieldError( form: FormGroup, field: string  ) : string | null {
   if( !form.controls[field].errors ) return null;
   const errors = form.controls[field].errors;

   const isArray = form.controls[field] instanceof FormArray;
   
   return FormUtil.getTextErrors(errors, field, isArray);
  }

  static isValidFieldInArray( formArray: FormArray, index: number) {
    return ( formArray.controls[index].errors  && formArray.controls[index].touched );
  }

  static getErrorsFieldInArray( formArray: FormArray, index: number) {
   if( !formArray.controls[index].errors ) return null;

   const errors = formArray.controls[index].errors;
   return FormUtil.getTextErrors(errors, index);
  }
  
}