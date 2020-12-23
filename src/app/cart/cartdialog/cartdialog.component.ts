import { Component, OnInit, inject, Inject, Input } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-cartdialog',
  templateUrl: './cartdialog.component.html',
  styleUrls: ['./cartdialog.component.css']
})
export class CartdialogComponent implements OnInit {
  @Input() total: number = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public products: any[],
  public dialog: MatDialog,
  public matDialogRef: MatDialogRef<CartdialogComponent>) { }

  ngOnInit(): void {
    this.getTotal();
  }

  onClose() {
    this.matDialogRef.close(false);
  }

  onPurchase() {
    this.matDialogRef.close(true);
  }

  getTotal() {
    for(let cartEl of this.products) {
      this.total = this.total + cartEl.quantity * cartEl.price;
    }
  }
}