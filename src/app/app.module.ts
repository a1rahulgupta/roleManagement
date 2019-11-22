import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {
  DialogModule
} from 'primeng/primeng';
import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule
} from '@angular/material';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { RoleManagementComponent } from './role-management/role-management.component';
const appRoutes: Routes = [
  {
    path: 'roleList',
    component: RoleManagementComponent,
  },
  {
    path: '',
    redirectTo: 'roleList',
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [
    AppComponent,
    RoleManagementComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DropdownModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    CalendarModule,
    DialogModule,
    SlimLoadingBarModule,
    Ng4LoadingSpinnerModule.forRoot(),
    ToastrModule.forRoot({
      preventDuplicates: true,
    }),
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
