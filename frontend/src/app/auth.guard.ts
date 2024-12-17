import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { catchError, delay, filter, map, Observable, of, timeout } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  // Guard koji priceka da se potvrdi da li je user ulogiran
  // prije nego sto ga preusmeri ili dopusti
  return toObservable(inject(AuthService).user)
    .pipe(
      timeout({
        each: 1000,
        with: () => of(false)
      }),
      filter((user) => user !== undefined), // Još se čeka
      map((user) => user ? true : false),
    );
};
