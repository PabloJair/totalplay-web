import { Component, OnInit, inject } from '@angular/core';
import { LoadService } from '../services/load.service';
import { ClickService } from '../services/click.service';
import { StateSelectorDialogComponent } from '../state-selector-dialog/state-selector-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PhoneNumberModalComponent } from '../phone-number-modal/phone-number-modal.component';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  scr: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  deviceInfo!: DeviceInfo;
  public lat: any;
  public lng: any;
  public titleLoader: string = 'Cargando';
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
  colonias: { [key: string]: string } = {
    'San Ángel ': 'AGS.',
    'San Ángel Inn	': 'BC.',
    'Guadalupe Inn	': 'BCS.',
    'Florida	': 'CAMP.',
    'Chimalistac	': 'COAH.',
    'Jardines del Pedregal	': 'COL.',
    'Las Águilas	': 'CHIS.',
    'Olivar de los Padres	': 'CHIH.',
    'Lomas de Plateros	': 'CDMX.',
    'Tizapán San Ángel	': 'DGO.',
    'Tlacopac	': 'GTO.',
    'Altavista	': 'GRO.',
    'Alfonso XIII	': 'HGO.',
    'Merced Gómez	': 'JAL.',
    'Santa Fe	': 'EDO-MÉX.',
  };

  selectedStateForm: string = '';
  myFlag = true;
  constructor(
    public loadService: LoadService,
    public clickService: ClickService,
    private deviceService: DeviceDetectorService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}
  readonly dialog = inject(MatDialog);

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.minLength(1), Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.minLength(1)]),
    state: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });

  ngOnInit(): void {
    this.spinner.show;
    this.getLocation();

    this.deviceInfo = this.deviceService.getDeviceInfo();
    //this.openDialogPhone();
    //
  }

  onSubmit(): void {
    this.spinner.show();
    this.postLoad();
  }
  openDialogState(): void {
    const dialogRef = this.dialog.open(StateSelectorDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.selectedState = result;
        this.spinner.show();
        this.titleLoader = 'Actualizando Información';
        this.postLoad();
      }
    });
  }

  openDialogPhone(): void {
    const dialogRefPhone = this.dialog.open(PhoneNumberModalComponent);
    dialogRefPhone.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.phoneNumber = result;
        this.openDialogState();
      }
    });
  }

  tiles: Tile[] = [
    {
      text: 'Servicios',
      cols: 1,
      rows: 1,
      color: '#7b7b7b',
      scr: 'assets/servers.png',
    },
    {
      text: 'Paquetes',
      cols: 1,
      rows: 1,
      color: 'lightgreen',
      scr: 'assets/satellite.png',
    },
    {
      text: '¿Cómo contratar?',
      cols: 1,
      rows: 1,
      color: 'lightpink',
      scr: 'assets/bubble-comments.png',
    },
    {
      text: 'Pagar Servicio',
      cols: 1,
      rows: 1,
      color: '#DDBDF1',
      scr: 'assets/money.png',
    },
  ];
  tiles2: Tile[] = [
    {
      text: 'Soporte',
      cols: 1,
      rows: 1,
      color: '#7b7b7b',
      scr: 'assets/question.png',
    },
    {
      text: 'Continuar llamada',
      cols: 1,
      rows: 1,
      color: 'lightgreen',
      scr: 'assets/satellite.png',
    },
  ];
  selectedState: string = '';
  phoneNumber: string = '';
  token = '';
  goToLink(url: string) {
    window.open(url, '_blank');
  }
  playSound = () => new Audio('assets/totalplayAudio.mp3').play();
  postLoad() {
    var name = '';
    var email = '';
    if (
      this.registerForm.value.name != null ||
      this.registerForm.value.name != undefined
    ) {
      name = this.registerForm.value.name;
    }
    if (
      this.registerForm.value.email != null ||
      this.registerForm.value.email != undefined
    ) {
      email = this.registerForm.value.email;
    }
    this.loadService
      .postLoad(
        this.deviceInfo,
        this.lat,
        this.lng,
        this.selectedState,
        this.phoneNumber,
        name,
        email
      )
      .pipe()
      .subscribe((response) => {
        this.token = response.token;
        this.spinner.hide();
        this.titleLoader = 'Cargando';

        this.postClick(
          '327',
          '',
          'opened|Acceso a Plataforma|INTERCEPCIÓN DE LLAMADAS'
        );
        this.one();
      });
  }

  postClick(
    id: string,
    link: string,
    other_information: string,
    isChange: boolean = false
  ) {
    this.clickService
      .postClick(id, other_information, this.token)
      .subscribe((response) => {
        if (isChange) {
          this.one();
        }
      });
    if (link != '') {
      this.goToLink(link);
    }
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (position) {
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
            this.spinner.hide();
          }
        },
        (error) => {}
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  one(): void {
    /*  this.router.navigate(['services'], {
      state: {
        response: { token: this.token },
      },
    }); */
    this.myFlag = !this.myFlag;
  }
}
