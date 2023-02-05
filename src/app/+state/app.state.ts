import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs';
import { ApiService } from '../data-access/api.service';
import { FeatureSet } from '../model/feature-set';
import { LoadProfile } from './app.actions';

export interface AppStateModel {
  profile?: FeatureSet | null;
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    profile: null,
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

  constructor(private api: ApiService) {}

  @Action(LoadProfile, { cancelUncompleted: true })
  loadProfile({ patchState }: StateContext<AppStateModel>) {
    return this.api.getData().pipe(
      tap((profile: FeatureSet) => {
        patchState({ profile });
      })
    );
  }
}
