import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.css']
})
export class RoleManagementComponent implements OnInit {
  roleModal: boolean = false;
  permissionModal: boolean = false
  userRole: FormGroup;
  listAllroles: any;
  
  permission: any= {
  files:
    { "create": false,
      "delete": false,
      "download": false,
      "move": false,
      "Design": false,
      "sign": false,
      "addSignatuteTask": false,
      "changingSigningMethod": false },
   templateFolders:
    { "create": false,
      "delete": false,
      "rename": false,
      "move": false,
      "download": false,
      "addFiles": false },
   privateFolders:
    { "create": false,
      "delete": false,
      "rename": false,
      "move": false,
      "download": false,
      "addFiles": false },
   workflowFolders:
    { "create": false,
      "delete": false,
      "rename": false,
      "move": false,
      "download": false,
      "addFiles": false },
   users:
    { "create": false,
      "update": false,
      "delete": false,
      "viewFolders": false }
    }
  userRoleId: any;

  public pageValue = [
    {
      size: 10
    },
    {
      size: 20
    },
    {
      size: 30,
    }
  ];
  fetchSize: any ;
 

  constructor(

    private router: Router, private api: ApiService,
    private formBuilder: FormBuilder, private toaster: ToastrService, private spinnerService: Ng4LoadingSpinnerService  ) {
 
    this.userRole = formBuilder.group({
      roleName: ['', []]
    });
  }

  ngOnInit() {
    this.fetchSize = this.pageValue[0];
    
    this.getAllRoleList();
  }
  public totalCount: number = 0;
  public pagination: any = {
    'page': 1,
    'count': 10,
    'searchText': '',
  };

  public setRecordPerPage(records: number): void {
    this.pagination.page = 1;
    this.pagination.limit = records;
    this.getAllRoleList();
  }
  public changePageLimit(pageLimit: any) {
    this.pagination.limit = pageLimit;
    this.getAllRoleList()
  }


  public getAllRoleList() {
    this.api.allRoleList(this.pagination).subscribe((result) => {
      const rs = result;
      if (rs.code === 200) {
        this.totalCount = Math.ceil(parseInt(rs.data.total_count) / this.pagination.count);
        this.listAllroles = rs.data.data;
      } else {
        this.toaster.error(rs.message);
      }
    });
  }
  getPermissionByRoleId(roleId){
    this.api.getPermissionByRoleId({roleId:roleId}).subscribe((result) => {
      const rs = result;
      if (rs.code === 200) {
        this.userRoleId = rs.data.permissionData.roleId;
        this.permission = rs.data.permissionData;
      } else {
        this.toaster.error(rs.message);
      }
    });
  }
  
  public deleteUserRole(roleId){
    this.api.deleteRole({roleId:roleId}).subscribe((result) => {
      const rs = result;
      if (rs.code === 200) {
        this.getAllRoleList();
        this.toaster.success(rs.message);
      } else {
        this.toaster.error(rs.message);
      }
    });
  }

  showDialog() {
    this.roleModal = true;
}
addPermission(roleId){
  this.permissionModal = true;
  this.getPermissionByRoleId(roleId)
}

addNewRole(){
  this.spinnerService.show();
  this.api.addNewRole(this.userRole.value).subscribe((res: any) => {
    if (res.code === 200) {
      this.spinnerService.hide();
      this.toaster.success(res.message);
      this.getAllRoleList();
      this.roleModal = false
      this.userRole.controls['roleName'].patchValue('');
       
    } else {
      this.toaster.error(res.message);
    }

  });
}

next() {
  this.pagination.page = this.pagination.page + 1
  this.getAllRoleList();
}

prev() {
  this.pagination.page = this.pagination.page - 1;
  this.getAllRoleList();
}
public updatePermission(permissionData){
this.api.updateUserPermission({permission:permissionData}).subscribe((result) => {

  const rs = result;
  if (rs.code === 200) {
    this.getAllRoleList();
    this.permissionModal = false
    this.toaster.success(rs.message);
  } else {
    this.toaster.error(rs.message);
  }
});
}
sortBy(data) {
    this.pagination.count = data.size;
  
  setTimeout(() => {
      this.getAllRoleList();
  }, 300);

}

}
