import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Observable, of} from "rxjs";
import * as fromRoot from '../store';
import {Store} from "@ngrx/store";
import {RootState} from "../store";

@Component({
  selector: 'app-region',
  template: `
    <mat-card>
      <mat-card-title-group>
        <mat-card-title>{{ (data$ | async).regionKey }}</mat-card-title>
      </mat-card-title-group>
      <mat-card-content>
        <table mat-table [dataSource]="(data$ | async).fisheries" class="mat-elevation-z8">

          <!--- Note that these columns can be defined in any order.
                The actual rendered columns are set as a property on the row definition" -->

          <!-- Position Column -->
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef> Name</th>
            <td mat-cell *matCellDef="let element"> {{element.SpeciesName}} </td>
          </ng-container>

          <!-- Name Column -->
          <ng-container matColumnDef="calories">
            <th mat-header-cell *matHeaderCellDef style="width: 75px;"> Calories</th>
            <td mat-cell *matCellDef="let element"> {{element.Calories}} </td>
          </ng-container>

          <!-- Weight Column -->
          <ng-container matColumnDef="fat">
            <th mat-header-cell *matHeaderCellDef style="width: 75px;"> Fat Content</th>
            <td mat-cell *matCellDef="let element"> {{element.FatTotal}} </td>
          </ng-container>
          <ng-container matColumnDef="description">
            <th mat-header-cell *matHeaderCellDef> Description</th>
            <td mat-cell *matCellDef="let element">
              <div [innerHTML]="element.PhysicalDescription"></div>
            </td>
          </ng-container>
          <ng-container matColumnDef="image">
            <th mat-header-cell *matHeaderCellDef> Image</th>
            <td mat-cell *matCellDef="let element">
              <img
                *ngIf="element.SpeciesIllustrationPhoto && element.SpeciesIllustrationPhoto.src"
                [src]="element.SpeciesIllustrationPhoto?.src" style="max-width: 100px; max-height: 50px;"
              />
            </td>
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
export class RegionComponent {
  data$: Observable<any>;
  displayedColumns = ['name', 'calories', 'fat', 'description', 'image'];

  constructor(private route: ActivatedRoute, private store: Store<{ rootState: RootState }>) {
    this.data$ = of({regionKey: '', fisheries: [], averageCalories: 0, averageFat: 0});
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        if (params['region']) {
          this.data$ = this.store.select(fromRoot.getFisheriesByRegion(params['region']));
        }
      });
  }
}
