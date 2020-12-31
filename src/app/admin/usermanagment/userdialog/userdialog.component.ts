import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-userdialog',
  templateUrl: './userdialog.component.html',
  styleUrls: ['./userdialog.component.css']
})
export class UserdialogComponent implements OnInit {

  userForm: FormGroup;
  isUpdate: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public user: any,
    private authService: AuthService,
    private matDialogRef: MatDialogRef<UserdialogComponent>,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if(this.user) {
      this.isUpdate = true;
      this.userForm = new FormGroup({
        'firstName': new FormControl(this.user.firstName, Validators.required),
        'lastName': new FormControl(this.user.lastName, Validators.required),
        'email': new FormControl(this.user.email, Validators.required),
        'password': new FormControl(this.user.password, Validators.required),
        'role': new FormControl(this.user.role, Validators.required),
        'id': new FormControl(this.user.id, Validators.required)
      });
    } else {
      this.userForm = new FormGroup({
        'firstName': new FormControl(null, Validators.required),
        'lastName': new FormControl(null, Validators.required),
        'email': new FormControl(null, Validators.required),
        'password': new FormControl(null, Validators.required),
        'role': new FormControl(null, Validators.required),
        'id': new FormControl(null, Validators.required)
      });
    }
  }

  onSubmit() {
    if(!this.userForm.valid){
      console.log("fail");
    }
      this.authService.signUp(this.userForm.value).subscribe((data) => {
        this.matDialogRef.close(true);
        this.snackBar.open('User updated successfully', '', {duration: 3000});
      }, error => {
        console.log(error);
      });
  }

  onClose() {
    this.matDialogRef.close(false);
  }

}
