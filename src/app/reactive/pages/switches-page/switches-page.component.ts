import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',
  styles: [
  ]
})
export class SwitchesPageComponent implements OnInit {

  public myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    wantNotifications: [true, Validators.required],
    termsAndConditions: [false, Validators.requiredTrue]
  });

  public person = {
    gender: 'F',
    wantNotifications: false,
  };

  constructor( private fb: FormBuilder) {}

  // Reestablece el formulario a su estado inicial
  ngOnInit(): void {
    this.myForm.reset(this.person);
  }

  isValidField( field: string ): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }

   //ngSubmit
  onSave(): void {

    if( this.myForm.invalid ){
      this.myForm.markAllAsTouched();
      return;
    }
    // Para eliminar terminos y condiciones del objeto:
      // Se desestructura del obj termsAndConditions y asigno un nuevo obj con el resto de props (newPerson)
    const { termsAndConditions, ...newPerson } = this.myForm.value;

    // Se crea person pq se requiere mostrar en el html, de lo contrario se puede enviar newPerson al back
    this.person = newPerson;
    console.log(this.myForm.value);
    console.log(this.person);

  }

}
