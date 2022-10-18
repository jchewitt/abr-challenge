import { createSelector } from '@ngrx/store';
import { RootState } from './noaa.reducer';

const getStateError = createSelector(
  (state: any) => state.rootState,
  (state: RootState): string => state.error
);

const getStateFisheries = createSelector(
  (state: { rootState: RootState }) => state.rootState,
  (state: RootState): Array<any> => state.fisheries
);

const getFisheriesByRegion = (key: string = 'all') => createSelector(
  (state: { rootState: RootState }) => state.rootState,
  (state: RootState): Array<any> => {
    const regions: any = {};
    state.fisheries.forEach(fishery => {
      if (!regions.hasOwnProperty(fishery.NOAAFisheriesRegion)) {
        regions[fishery.NOAAFisheriesRegion] = {fisheries: []};
      }
      regions[fishery.NOAAFisheriesRegion].fisheries.push(fishery);
    })
    if (state.fisheries.length) {
      for (let key in regions) {
        const region = regions[key];
        const calories = region.fisheries.map((fishery: any) => parseInt(fishery.Calories)).filter((num: number) => !isNaN(num));
        region.averageCalories = Math.trunc(calories
            .reduce((a: number, b: number) => a + b)
          / calories.length);

        const fatTotals = region.fisheries.map((fishery: any) => parseFloat(fishery.FatTotal)).filter((num: number) => !isNaN(num));
        region.averageFat = (fatTotals
            .reduce((a: number, b: number) => a + b)
          / fatTotals.length).toFixed(2);
      }
      if (key !== 'all' && regions.hasOwnProperty(key)) {
        return {regionKey: key, ...regions[key]};
      }
      const regionsArray: Array<any> = [];
      for (let regionKey in regions) {
        regionsArray.push({regionKey, ...regions[regionKey]});
      }
      return regionsArray;
    }
    return [];
  }
)

export { getStateError, getStateFisheries, getFisheriesByRegion };
