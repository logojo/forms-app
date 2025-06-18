import { AbstractControl, FormArray, FormGroup, ValidationErrors } from "@angular/forms";


//* función asincrona para ejemplo

async function sleep() {
  return new Promise( resolve => {
    setTimeout(() => {
      resolve(true)
    },2500)
  })  
}

export class FormUtil {

  static namePattern = '^([a-zA-Z]+) ([a-zA-Z]+)$';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

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
          case 'emailTaken':
            return `El correo ya fue registrado con anterioridad`;
          case 'usernameTaken':
            return `El usuario ya fue registrado con anterioridad`;
          case 'pattern':
              if( errors['pattern'].requiredPattern === FormUtil.namePattern )
                return `El campo debe de tener nombre y apellido`;
              else if( errors['pattern'].requiredPattern === FormUtil.emailPattern )
                 return `Debe ingresar un email valido`;
              else if(errors['pattern'].requiredPattern === FormUtil.notOnlySpacesPattern) {
                return `Debe ingresar un email valido`;
              }else {
                console.log(errors['pattern'].requiredPattern);
                
                return 'Error de expresión regular no controlado '
              }
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

  static passConfirmValid( pass: string, confirm: string  )  {
      return ( formGroup : AbstractControl ) => {
        const password = formGroup.get(pass)?.value;
        const conf = formGroup.get(confirm)?.value;

        return password === conf 
        ? null
        : {
            confirmInvalid: true
          }
      }
  }

  static async checkingServeResponse(control: AbstractControl) : Promise<ValidationErrors | null> {
   
    
    await sleep(); //simulando peticion al servidor

    const formvalue = control.value;

    if( formvalue === 'hola@mundo.com') {
      return {
        emailTaken: true
      }
    }
    return null;
  }

  static checkingUsername(control: AbstractControl) : ValidationErrors | null {
    const value = control.value;
    return value === 'logojo' ? { usernameTaken: true } :  null;
  }
  
}