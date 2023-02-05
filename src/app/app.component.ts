import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { BehaviorSubject, take, tap } from 'rxjs';
import { LoadProfile } from './+state/app.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
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
