import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {

  // public myForm2 = new FormGroup({
  //   favoriteGames: new FormArray([])
  // });

  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.minLength(3) ]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required ],
      ['Death Stranding', Validators.required ],
    ])
  });

  public newFavorite: FormControl = new FormControl('', Validators.required );

  constructor( private fb: FormBuilder ) {}

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }


  isValidField( field: string ): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }

  isValidFieldInArray( formArray: FormArray, index: number ) {
    return formArray.controls[index].errors
        && formArray.controls[index].touched;
  }


  getFieldError( field: string ): string | null {

    if ( !this.myForm.controls[field] ) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors) ) {
      switch( key ) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength } caracters.`;
      }
    }

    return null;
  }

  onAddToFavorites():void {
    // Si el nuevo favorito es invalido no regresa nada
    if ( this.newFavorite.invalid ) return;
    // De lo contrario lo almacena en newGame
    const newGame = this.newFavorite.value;

    // Agrega el newGame al array de favs
    this.favoriteGames.push(
      this.fb.control( newGame, Validators.required )
    );
    // Reestablece el campo a vacio
    this.newFavorite.reset();

  }


  onDeleteFavorite( index:number ):void {
    this.favoriteGames.removeAt(index);
  }

  onSubmit():void {

    // Si el formulario es invalido marca todo lo que he tocado y retorna
    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
    // Reestablece el array favoriteGames a vacio
    (this.myForm.controls['favoriteGames'] as FormArray ) = this.fb.array([]);
    // Limpia el formulario
    this.myForm.reset();

  }

}
