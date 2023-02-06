import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LoadProfile } from './state/app.actions';
import { AppState } from './state/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  @Select(AppState.getElevation)
  readonly elevation$: Observable<{ x: number; y: number }[]>;

  @Select(AppState.getElevationAvg)
  readonly elevationAvg$: Observable<number>;

  @Select(AppState.getElevationMax)
  readonly elevationMax$: Observable<number>;

  @Select(AppState.isLoading)
  readonly isLoading$: Observable<boolean>;

  @Select(AppState.hasError)
  readonly hasError$: Observable<boolean>;

  constructor(private readonly store: Store) {}

  requestElevationData() {
    this.store.dispatch(new LoadProfile());
  }
}
