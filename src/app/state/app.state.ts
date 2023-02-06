import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { catchError, of, tap } from 'rxjs';
import { ApiService } from '../data-access/api.service';
import { FeatureSet } from '../model/feature-set';
import { LoadProfile } from './app.actions';

export interface AppStateModel {
  profile: FeatureSet | null;
  isLoading: boolean;
  hasError: boolean;
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    profile: null,
    isLoading: false,
    hasError: false,
  },
})
@Injectable({ providedIn: 'root' })
export class AppState {
  @Selector()
  static getPaths(state: AppStateModel) {
    return (
      state.profile?.results[0].value.features[0].geometry.paths[0] ?? null
    );
  }

  @Selector([AppState.getPaths])
  static getElevation(
    state: AppStateModel,
    paths: [number, number, number, number][]
  ): { x: number; y: number }[] {
    return paths?.map((e: [number, number, number, number]) => {
      return { x: e[3], y: e[2] };
    });
  }

  @Selector([AppState.getPaths])
  static getElevationValues(
    state: AppStateModel,
    paths: [number, number, number, number][]
  ): number[] {
    return paths?.map((e: [number, number, number, number]) => e[2]);
  }

  @Selector([AppState.getElevationValues])
  static getElevationAvg(
    state: AppStateModel,
    values: number[]
  ): number | null {
    const sum = values?.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    return values?.length ? Math.round(sum / values.length) : null;
  }

  @Selector([AppState.getElevationValues])
  static getElevationMax(
    state: AppStateModel,
    values: number[]
  ): number | null {
    return values?.length ? Math.round(Math.max(...values)) : null;
  }

  @Selector()
  static isLoading(state: AppStateModel) {
    return state.isLoading;
  }

  @Selector()
  static hasError(state: AppStateModel) {
    return state.hasError;
  }

  constructor(private api: ApiService) {}

  @Action(LoadProfile, { cancelUncompleted: true })
  loadProfile({ patchState }: StateContext<AppStateModel>) {
    patchState({ isLoading: true, hasError: false });
    return this.api.getData().pipe(
      tap((profile: FeatureSet) => {
        patchState({ profile, isLoading: false });
      }),
      catchError(err => {
        patchState({ isLoading: false, hasError: true });
        console.error(err);
        return of(null);
      })
    );
  }
}
