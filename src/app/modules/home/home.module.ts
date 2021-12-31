import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableOverviewComponent } from './components/table-overview/table-overview.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomeRoutingModule } from './home-routing.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AddUpdateEmployeeComponent } from './components/add-update-employee/add-update-employee.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    TableOverviewComponent,
    AddUpdateEmployeeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PaginationModule.forRoot(),
    ReactiveFormsModule,
    RouterModule,
    HomeRoutingModule,
    ModalModule.forRoot()
  ]
})
export class HomeModule { }
