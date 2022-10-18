import { Injectable } from '@angular/core'
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { NoaaService } from '../services/noaa.service';
import { ApiGetFisheries, ApiGetFisheriesFailure, ApiGetFisheriesSuccess } from './noaa.actions';
import { catchError, map, mergeMap, tap, concatMap, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class RootEffects {

  constructor(private actions$: Actions, private noaaService: NoaaService) { }

  getFisheriesEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(ApiGetFisheries),
      tap(() => { console.log('new getFisheriesEffect occurred in queue') }),
      mergeMap((action) => {
        console.log('new getFisheriesEffect running')
        return this.noaaService.getFisheries().pipe(
          map(res => ApiGetFisheriesSuccess({ data: res })),
          catchError(error => {
            console.log('Catching Fisheries Error');
            return of(ApiGetFisheriesFailure({ error }))
          }),
          tap(() => { console.log('getFisheriesEffect finished.')})
        )
      })
    )
  )
}
