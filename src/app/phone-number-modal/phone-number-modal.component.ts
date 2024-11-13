import { Component, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule, MatPrefix } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-phone-number-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButton,
    MatPrefix,
  ],
  templateUrl: './phone-number-modal.component.html',
  styleUrl: './phone-number-modal.component.css',
})
export class PhoneNumberModalComponent implements OnInit {
  phoneNumber: string = '';
  constructor(public dialogRef: MatDialogRef<PhoneNumberModalComponent>) {}
  ngOnInit(): void {
    this.dialogRef.disableClose = true;
  }

  onConfirm(): void {
    // Devuelve el número telefónico al cerrar el modal
    this.dialogRef.close(this.phoneNumber);
  }

  onCancel(): void {
    // Cierra el modal sin devolver ningún valor
    this.dialogRef.close();
  }
}
