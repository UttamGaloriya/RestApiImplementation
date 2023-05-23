import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { TableComponent } from './table/table.component';
import { EditComponent } from './edit/edit.component';
import { MyprofileComponent } from './myprofile/myprofile.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: '', component: MyprofileComponent },
      { path: 'table', component: TableComponent },
      { path: 'edit/:id', component: EditComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
