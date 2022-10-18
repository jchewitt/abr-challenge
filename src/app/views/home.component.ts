import {Component} from "@angular/core";
import {Store} from "@ngrx/store";
import {RootState} from "../store";
import * as fromRoot from "../store";
import {Observable} from "rxjs";

@Component({
  selector: 'home',
  template: `
    <mat-card>
      <mat-card-title>Region Data</mat-card-title>
      <mat-card-content>
        <table mat-table [dataSource]="data$ | async" class="mat-elevation-z8">

          <!--- Note that these columns can be defined in any order.
                The actual rendered columns are set as a property on the row definition" -->

          <!-- Position Column -->
          <ng-container matColumnDef="region">
            <th mat-header-cell *matHeaderCellDef> Region </th>
            <td mat-cell *matCellDef="let element"> <a [routerLink]="'/region'" [queryParams]="{region: element.regionKey}">{{element.regionKey}}</a> </td>
          </ng-container>

          <!-- Name Column -->
          <ng-container matColumnDef="calories">
            <th mat-header-cell *matHeaderCellDef> Average Calories </th>
            <td mat-cell *matCellDef="let element"> {{element.averageCalories}} </td>
          </ng-container>

          <!-- Weight Column -->
          <ng-container matColumnDef="fat">
            <th mat-header-cell *matHeaderCellDef> Average Fat Content </th>
            <td mat-cell *matCellDef="let element"> {{element.averageFat}} g </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    table {
      width: 100%;
    }
    mat-card-title {
      margin: 25px 0;
    }

  `]
})
export class HomeComponent {
  data$: Observable<any>;
  displayedColumns = ['region', 'calories', 'fat']
  constructor(private store: Store<{ rootState: RootState }>) {
    this.data$ = this.store.select(fromRoot.getFisheriesByRegion('all'));
  }
}
