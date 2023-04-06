import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Service/auth.service';
import { UserService } from 'src/app/Service/user.service';
import { ROLE_TYPE } from 'src/app/constants/role';

@Component({
  selector: 'app-update-user-modal',
  templateUrl: './update-user-modal.component.html',
  styleUrls: ['./update-user-modal.component.css'],
})
export class UpdateUserModalComponent {
  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private toastr: ToastrService,
    private dialogref: MatDialogRef<UpdateUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // this.authService.getuserrole().subscribe((res) => {
    //   this.rolelist = res;
    // });
  }
  public userRole = ROLE_TYPE;

  ngOnInit(): void {
    if (this.data.usercode != '' && this.data.usercode != null) {
      this.loaduserdata(this.data.usercode);
    }
    console.log(this.userRole);
  }
  // rolelist: any;

  editdata: any;

  updateForm = this.builder.group({
    id: this.builder.control(''),
    userName: this.builder.control(''),
    fullName: this.builder.control(''),
    password: this.builder.control(''),
    email: this.builder.control(''),
    role: this.builder.control('', Validators.required),
    status: this.builder.control(false),
  });

  loaduserdata(id: any) {
    this.authService.GetUserbyId(id).subscribe((res) => {
      this.editdata = res;
      console.log(this.editdata);
      this.updateForm.setValue({
        id: this.editdata.id,
        userName: this.editdata.userName,
        fullName: this.editdata.fullName,
        password: this.editdata.password,
        email: this.editdata.email,
        role: this.editdata.role,
        status: this.editdata.status,
      });
    });
  }
  UpdateUser() {
    this.userService
      .updateuser(this.updateForm.value.id, this.updateForm.value)
      .subscribe((res) => {
        this.toastr.success('Updated successfully.');
        this.dialogref.close();
      });
  }
}
