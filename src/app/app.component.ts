import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { BehaviorSubject, Observable, take, tap } from 'rxjs';
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

  readonly isLoading$$ = new BehaviorSubject(false);
  readonly alertMessage$$ = new BehaviorSubject('');

  constructor(private readonly store: Store) {}

  requestElevationData() {
    this.isLoading$$.next(true);
    this.alertMessage$$.next('');

    this.store
      .dispatch(new LoadProfile())
      .pipe(
        take(1),
        tap({
          next: () => this.isLoading$$.next(false),
          error: err => {
            this.alertMessage$$.next('oops... something went wrong');
            this.isLoading$$.next(false);
            console.error(err);
          },
        })
      )
      .subscribe();
  }
}
