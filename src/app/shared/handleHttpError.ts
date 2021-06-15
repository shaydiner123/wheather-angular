import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';

export function handleError(error: HttpErrorResponse, subject?: Subject<any>) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
    subject?.next(error.error.message);
    return;
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong.
    console.error(
      `Backend returned code ${error.status}, ` + `body was: ${error.error}`
    );
    // Return an observable with a user-facing error message.
    subject?.next('Something bad happened; please try again later.');
  }
}
