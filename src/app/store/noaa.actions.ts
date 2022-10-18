import { createAction, props } from '@ngrx/store';

const API_GET_FISHERIES = '[Noaa Api] Get Fisheries';
const API_GET_FISHERIES_SUCCESS = '[Noaa Api] Get Fisheries Success';
const API_GET_FISHERIES_FAILURE = '[Noaa Api] Get Fisheries Failure';

export const ApiGetFisheries = createAction(API_GET_FISHERIES);
export const ApiGetFisheriesSuccess = createAction(API_GET_FISHERIES_SUCCESS, props<{ data: any }>());
export const ApiGetFisheriesFailure = createAction(API_GET_FISHERIES_FAILURE, props<{ error: any }>());
