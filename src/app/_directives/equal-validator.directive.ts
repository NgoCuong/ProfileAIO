import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';


export function equalValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? {'inputValue': {value: control.value}} : null;
  };
}




@Directive({
  selector: '[appEqualValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: EqualValidatorDirective, multi: true }]
})

export class EqualValidatorDirective implements Validator {

  @Input('appEqualValidator') inputValue: string;

  validate(control: AbstractControl): { [key: string]: any } {
    console.log('inside validator');
    console.log(this.inputValue);

    return this.inputValue ? equalValidator(new RegExp(this.inputValue, 'i'))(control)
      : null;
  }

}
