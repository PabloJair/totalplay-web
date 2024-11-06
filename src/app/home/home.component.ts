import { Component, OnInit, inject } from '@angular/core';
import { LoadService } from '../services/load.service';
import { ClickService } from '../services/click.service';
import { StateSelectorDialogComponent } from '../state-selector-dialog/state-selector-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PhoneNumberModalComponent } from '../phone-number-modal/phone-number-modal.component';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';

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
  constructor(
    public loadService: LoadService,
    public clickService: ClickService,
    private deviceService: DeviceDetectorService
  ) {}
  readonly dialog = inject(MatDialog);
  ngOnInit(): void {
    this.getLocation();

    this.deviceInfo = this.deviceService.getDeviceInfo();

    //
  }
  openDialogState(): void {
    const dialogRef = this.dialog.open(StateSelectorDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        console.log(result);
        this.selectedState = result;
        this.openDialogPhone();
      }
    });
  }

  openDialogPhone(): void {
    const dialogRefPhone = this.dialog.open(PhoneNumberModalComponent);
    dialogRefPhone.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        console.log(result);
        this.phoneNumber = result;
        this.postLoad();
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
    this.loadService
      .postLoad(
        this.deviceInfo,
        this.lat,
        this.lng,
        this.selectedState,
        this.phoneNumber
      )
      .pipe()
      .subscribe((response) => {
        this.token = response.token;
        console.log(this.token);
      });
  }

  postClick(id: string, link: string, other_information: string) {
    this.clickService.postClick(id, other_information, this.token).subscribe({
      next(value) {
        console.log(value.token);
      },
      error(err) {
        console.log(err);
      },
    });
    this.goToLink(link);
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (position) {
            console.log(
              'Latitude: ' +
                position.coords.latitude +
                'Longitude: ' +
                position.coords.longitude
            );
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
            console.log(this.lat);
            console.log(this.lat);
            this.openDialogState();
          }
        },
        (error) => {
          alert('activa los permisos');

          console.log(error);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }
}
