import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from './store';
import {Observable} from "rxjs";
import {RootState} from "./store";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  error$: Observable<string>
  data$: Observable<Array<any>>
  title = 'abr-challenge'
  navRoutes: Array<any> = []
  constructor(private store: Store<{ rootState: RootState }>) {
    this.error$ = this.store.select(fromRoot.getStateError);
    this.data$ = this.store.select(fromRoot.getFisheriesByRegion('all'));
  }

  ngOnInit() {
    this.store.dispatch(fromRoot.ApiGetFisheries());
    this.data$.subscribe(data => {
      this.navRoutes = [{
        path: '/home',
        queryParams: {},
        title: 'Home'
      }, ...data.map((fishery: any) => ({
        path: '/region',
        title: fishery.regionKey,
        queryParams: {region: fishery.regionKey}
      }))]
    })
  }
}
