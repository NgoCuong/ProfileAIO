import { Directive, Input, HostListener, Attribute } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';

@Directive({
  selector: '[appEqualValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: EqualValidatorDirective, multi: true }]
})

export class EqualValidatorDirective implements Validator {
  constructor(@Attribute('appEqualValidator') public appEqualValidator: string,
    @Attribute('reverse') public reverse: string) { }

  private get isReverse() {
    if (!this.reverse) {
      return false;
    }
    return this.reverse === 'true' ? true : false;
  }

  validate(control: AbstractControl): { [key: string]: any } {
    // self value
    let value1 = control.value;

    // control vlaue
    let value2 = control.root.get(this.appEqualValidator);

    // value not equal
    if (value2 && value1 !== value2.value && !this.isReverse) {
      return {
        validateEqual: false
      };
    }

    // value equal and reverse
    if (value2 && value1 === value2.value && this.isReverse) {
      delete value2.errors['validateEqual'];
      if (!Object.keys(value2.errors).length) {
        value2.setErrors(null);
      }
    }

    // value not equal and reverse
    if (value2 && value1 !== value2.value && this.isReverse) {
      value2.setErrors({ validateEqual: false });
    }

    return null;
  }
}
