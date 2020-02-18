import { FormArray, FormGroup } from '@angular/forms';
export class CustomValidators {
  static minLengthOfValidAnswers() {
    return (a: FormArray) => {
      const isValidArray = a.controls
        .map((c: FormGroup) => c.get('IsCorrect').value as boolean)
        .filter(x => x === true);
      if (isValidArray.length == 0) {
        return {
          minLengthOfValidAnswers: {
            foundAnswers: isValidArray.length
          }
        };
      }
      return null;
    };
  }
}
