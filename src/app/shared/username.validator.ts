import { AbstractControl } from "@angular/forms";


export function forbiddenNameValidator(control:AbstractControl):{[key:string]:any}{
const forbidden= /admin/.test(control.value);
return forbidden ? {'forbiddenName':{value:control.value}}: null;
}