import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { UserdialogComponent } from './userdialog/userdialog.component';
import { MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-usermanagment',
  templateUrl: './usermanagment.component.html',
  styleUrls: ['./usermanagment.component.css']
})
export class UsermanagmentComponent implements OnInit {

  @Input() users: User[];
  searchText: string;

  constructor(private authService: AuthService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.authService.recieveUser().subscribe((responseData: User[]) => {
      this.users = responseData;
    });
  }

  addUser() {
    let dialogRef = this.dialog.open(UserdialogComponent, {
      width: '40%'
    });

    dialogRef.afterClosed().subscribe(changed => {
      if(changed) {
        this.authService.recieveUser().subscribe(data => {
          this.users = data;
        })
      }
    })
  }

  updateUser(user: any) {
    let dialogRef = this.dialog.open(UserdialogComponent, {
      width: '40%',
      data: user
    });

    dialogRef.afterClosed().subscribe(data => {
      this.users = data
    });
  }

  deleteUser(index) {
    this.authService.deleteUserFromDB(this.users[index]).subscribe(() => {
      this.users.splice(index, 1);
      this.snackBar.open('Successfully removed user!', '', {
        duration: 3000
      })
    }, error => {
      console.log(error);
    })
  }

}
