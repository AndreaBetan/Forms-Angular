import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { delay, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmailValidator implements AsyncValidator {


  validate(control: AbstractControl ): Observable<ValidationErrors | null> {

    const email = control.value;

    // Creacion de observable
    const httpCallObservable = new Observable<ValidationErrors|null>( (subscriber) => {

      console.log({ email });

      // Si el email que evaluo en el control es === al email de la peticion http
      if ( email === 'andrea@google.com' ) {
        // Indica que el correo ya fue tomado
        subscriber.next({ emailTaken: true });
        subscriber.complete();
        return;
      }

    }).pipe(
      // Retrasa la ejecicion 3 segundos
      delay( 3000 )
    );

    return httpCallObservable;

  }



  // validate(control: AbstractControl ): Observable<ValidationErrors | null> {

  //   const email = control.value;
  //   console.log({ email })

  //   return of({
  //     emailTaken: true
  //   }).pipe(
  //     delay( 2000 )
  //   );

  // }


}

// VALIDACION DE LA EXISTENCIA DE CORREO ELECTRONICO EN UN DB
// return this.http.get<any[]>(`http://localhost:3000/users?q=${ email }`)
// .pipe(
//   // delay(3000),
//   map( resp => {
//     return ( resp.length === 0 )
//         ? null
//         : { emailTaken: true }
//   })
// );
