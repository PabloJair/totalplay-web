import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-state-selector-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
  ],
  templateUrl: './state-selector-dialog.component.html',
  styleUrl: './state-selector-dialog.component.css',
})
export class StateSelectorDialogComponent {
  states: { [key: string]: string } = {
    AGUASCALIENTES: 'AGS.',
    'BAJA CALIFORNIA': 'BC.',
    'BAJA CALIFORNIA SUR': 'BCS.',
    CAMPECHE: 'CAMP.',
    COAHUILA: 'COAH.',
    COLIMA: 'COL.',
    CHIAPAS: 'CHIS.',
    CHIHUAHUA: 'CHIH.',
    'CIUDAD DE MEXICO': 'CDMX.',
    DURANGO: 'DGO.',
    GUANAJUATO: 'GTO.',
    GUERRERO: 'GRO.',
    HIDALGO: 'HGO.',
    JALISCO: 'JAL.',
    MEXICO: 'EDO-MÉX.',
    MICHOACAN: 'MICH.',
    MORELOS: 'MOR.',
    NAYARIT: 'NAY.',
    'NUEVO LEON': 'NL.',
    OAXACA: 'OAX.',
    PUEBLA: 'PUE.',
    QUERETARO: 'QRO.',
    'QUINTANA ROO': 'QROO.',
    'SAN LUIS POTOSI': 'SLP.',
    SINALOA: 'SIN.',
    SONORA: 'SON.',
    TABASCO: 'TAB.',
    TAMAULIPAS: 'TAMPS.',
    TLAXCALA: 'TLAX.',
    VERACRUZ: 'VER.',
    YUCATAN: 'YUC.',
    ZACATECAS: 'ZAC.',
  };
  selectedState: string = '';

  constructor(public dialogRef: MatDialogRef<StateSelectorDialogComponent>) {}

  onConfirm(): void {
    this.dialogRef.close(this.selectedState);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
