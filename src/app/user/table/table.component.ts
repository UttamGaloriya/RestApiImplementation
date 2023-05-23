import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/_services/alert.service';
import { DailogService } from 'src/app/_services/dailog.service';
import { UserService } from 'src/app/_services/user.service';
import { userObj } from 'src/app/user';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  user: userObj | null = null
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  constructor(private userServices: UserService, private alert: AlertService, private dailog: DailogService) {
    this.userServices.getAllData()
      .subscribe(data => {

        this.dataSource = new MatTableDataSource<any>(data.users);
        this.dataSource.paginator = this.paginator;
      })
  }

  ngOnInit(): void {
  }
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'Action'];

  delete(id: number) {
    this.userServices.getUserData(id).subscribe(
      (res) => { this.deleteData(id, res) },
      (error) => { this.alert.error(error) }
    )
  }
  deleteData(id: number, res: any) {
    this.dailog.openConfirmDialog(res.firstName, res.email).afterClosed().subscribe((res => {
      if (res) {
        this.userServices.deleteData(id).subscribe(
          (data) => { this.alert.showNotification("congratulations data deleted", "ok", "success"), console.log(data) },
          (error) => { this.alert.showNotification("data not deleted", "ok", "error") }
        )
      } else {
        this.alert.showNotification("congratulations data not deleted", "ok", "info")
      }
    }))
  }
}
