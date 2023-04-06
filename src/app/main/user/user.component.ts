import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/Service/user.service';
import { ROLE_TYPE } from 'src/app/constants/role';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserModalComponent } from './update-user-modal/update-user-modal.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements AfterViewInit {
  constructor(private userService: UserService, private dialog: MatDialog) {
    this.loadUser();
  }
  ngAfterViewInit(): void {}
  public userRole = ROLE_TYPE;

  userlist: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  loadUser() {
    this.userService.getAllUser().subscribe((data) => {
      this.userlist = data;
      this.dataSource = new MatTableDataSource(this.userlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  displayedColumns: string[] = [
    'id',
    'userName',
    'fullName',
    'email',
    'role',
    'status',
    'action',
  ];
  deleteUser(id: number) {
    this.userService.deleteUserById(id).subscribe((res) => {
      return this.loadUser();
    });
  }
  updateuser(code: any) {
    this.OpenDialog('1000ms', '600ms', code);
  }
  OpenDialog(enteranimation: any, exitanimation: any, code: string) {
    const popup = this.dialog.open(UpdateUserModalComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '30%',
      data: {
        usercode: code,
      },
    });
    popup.afterClosed().subscribe((res) => {
      this.loadUser();
    });
  }
}
