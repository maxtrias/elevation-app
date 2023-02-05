import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { BehaviorSubject, Observable, take, tap } from 'rxjs';
import { LoadProfile } from './+state/app.actions';
import { AppState } from './+state/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  @Select(AppState.getElevation) readonly elevation$: Observable<
    { x: number; y: number }[]
  >;

  isLoading$$ = new BehaviorSubject(false);

  constructor(private store: Store) {}

  requestElevationData() {
    this.isLoading$$.next(true);

    this.store
      .dispatch(new LoadProfile())
      .pipe(
        take(1),
        tap({
          next: () => this.isLoading$$.next(false),
          error: err => {
            this.isLoading$$.next(false);
            console.error(err);
          },
        })
      )
      .subscribe();
  }
}
