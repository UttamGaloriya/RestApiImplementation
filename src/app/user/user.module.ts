import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { TableComponent } from './table/table.component';
import { EditComponent } from './edit/edit.component';
import { MaterialmodualModule } from '../materialmodual/materialmodual.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LayoutComponent,
    TableComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialmodualModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
