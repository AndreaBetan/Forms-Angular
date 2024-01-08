import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/service/validartor.service';
import { EmailValidator } from 'src/app/shared/validators/email.validator.service';


@Component({
  templateUrl: './register-page.component.html',
  styles: [
  ]
})
export class RegisterPageComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.pattern(this.validatorsService.firstNameAndLastnamePattern) ]],
    // email: ['', [ Validators.required, Validators.pattern(this.validatorsServices.emailPattern) ], [new EmailValidator],
    email: ['', [ Validators.required, Validators.pattern(this.validatorsService.emailPattern) ], [this.emailValidator]],
    username: ['', [ Validators.required, this.validatorsService.cantBeStrider ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
    password2: ['', [ Validators.required ]],
  },{
    validators: [
      this.validatorsService.isFieldOneEqualFieldTwo('password','password2')
    ]
  })

  constructor (
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private emailValidator: EmailValidator
  ) {}

  // Trae el servicio donde se realiza la validacion y se le envian los parametros del form actual
  isValidField( field: string ){
    return this.validatorsService.isValidField(this.myForm, field)
  }

  onSubmit(): void {
    this.myForm.markAllAsTouched();
  }

}
