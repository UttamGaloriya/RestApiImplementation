import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/_services/alert.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  constructor(private userServices: UserService, private alert: AlertService) {
    this.userServices.getAllData()
      .subscribe(data => {
        console.log(data)
        this.dataSource = new MatTableDataSource<any>(data.users);
        this.dataSource.paginator = this.paginator;
      })
  }

  ngOnInit(): void {
  }
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'Action'];

  delete(id: number) {
    this.userServices.deleteData(id).subscribe(
      () => { this.alert.showNotification("congress data delte", "ok", "success") },
      () => { this.alert.showNotification("congress data not delte", "ok", "error") }
    )
  }
}
