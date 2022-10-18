import {Component, ElementRef, Input, ViewChild} from "@angular/core";
import {MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'app-nav',
  template: `
    <mat-toolbar color="primary">
      <mat-toolbar-row>
        <button mat-icon-button>
          <mat-icon (click)="sideNav.toggle()">menu</mat-icon>
        </button>
        <h1>ABR Coding Activity</h1>
        <span class="menu-spacer"></span>
        <div>
          <a mat-button *ngFor="let route of navRoutes; index as i;" [routerLink]="route.path" [queryParams]="route.queryParams"> {{ route.title }} </a>
        </div>
      </mat-toolbar-row>

      <mat-toolbar-row>
        <span style="font-size: 12px;">NOAA Fisheries Data</span>
      </mat-toolbar-row>
    </mat-toolbar>
    <mat-sidenav-container>
      <mat-sidenav #sidenav>
        <mat-nav-list>

          <a mat-list-item (click)="sidenav.toggle()" *ngFor="let route of navRoutes" [routerLink]="route.path" [queryParams]="route.queryParams"> {{ route.title }} </a>

        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <div style="height: 88vh; display: flex; justify-content: center;">
          <ng-content></ng-content>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .menu-spacer {
      width: 10%;
    }
    mat-sidenav {
      padding: 0 25px;
    }
  `]
})
export class AppNavComponent {
  @Input() navRoutes: Array<{ path: string, title: string, queryParams: any }> = []
  @ViewChild('sidenav') sideNav: any

  constructor() {}
}
