import { Component, VERSION } from "@angular/core";
// import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators, FormGroup, FormArray } from "@angular/forms";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(private fb: FormBuilder) {}

  registrationForm: FormGroup;

  get userName() {
    return this.registrationForm.get("userName");
  }
  get email() {
    return this.registrationForm.get("email");
  }
  get alternateEmails() {
    return this.registrationForm.get("alternateEmails") as FormArray;
  }

  addAlternateEmails() {
    this.alternateEmails.push(this.fb.control(""));
  }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      userName: ["", [Validators.required, Validators.minLength(3)]],
      password: [""],
      email: [""],
      subscribe: [false],
      confirmpassword: [""],
      address: this.fb.group({
        city: [""],
        state: [""],
        postalCode: [""]
      }),
      alternateEmails: this.fb.array([])
    });
    this.registrationForm
      .get("subscribe")
      .valueChanges.subscribe(checkedValue => {
        const email = this.email;
        if (checkedValue) {
          email.setValidators(Validators.required);
        } else {
          email.clearValidators();
        }
        email.updateValueAndValidity();
        console.log(this.email);
      });
  }
}
