import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PermissionComponent } from '../permission/permission.component';

@Injectable({
  providedIn: 'root'
})
export class DailogService {

  constructor(private dailog: MatDialog) { }
  openConfirmDialog(msg: any, em: any) {
    return this.dailog.open(PermissionComponent, {
      width: '400px',
      panelClass: 'confirm-dailog',
      disableClose: true,
      data: {
        name: msg,
        email: em,
      },
    });
  }
}
