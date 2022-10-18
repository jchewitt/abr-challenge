import { createReducer, on } from '@ngrx/store';

import { ApiGetFisheriesSuccess, ApiGetFisheriesFailure } from './noaa.actions';

export interface RootState {
  error: any
  fisheries: Array<any>
}

const initialState: RootState = {
  error: null,
  fisheries: []
}

export const rootReducer = createReducer(initialState,
  on(ApiGetFisheriesFailure, (state, action) => ({ error: action.error, fisheries: [] })),
  on(ApiGetFisheriesSuccess, (state, action) => ({ fisheries: action.data, error: null }))
);
