import { Component, OnInit, inject } from '@angular/core';
import { LoadService } from '../services/load.service';
import { ClickService } from '../services/click.service';
import { StateSelectorDialogComponent } from '../state-selector-dialog/state-selector-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PhoneNumberModalComponent } from '../phone-number-modal/phone-number-modal.component';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';
import { Router } from '@angular/router';

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
    private deviceService: DeviceDetectorService,
    private router: Router
  ) {}
  readonly dialog = inject(MatDialog);
  ngOnInit(): void {
    this.getLocation();

    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.openDialogPhone();
    //
  }
  openDialogState(): void {
    const dialogRef = this.dialog.open(StateSelectorDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.selectedState = result;
        this.postLoad();
        this.postClick(
          '327',
          '',
          'opened|Acceso a Plataforma|INTERCEPCIÓN DE LLAMADAS'
        );
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
      });
  }

  postClick(
    id: string,
    link: string,
    other_information: string,
    isChange: boolean = false
  ) {
    this.clickService.postClick(id, other_information, this.token).subscribe({
      next(value) {},
      error(err) {},
    });
    if (link != '') {
      this.goToLink(link);
    }
    if (isChange) {
      this.one();
    }
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (position) {
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
          }
        },
        (error) => {}
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  one(): void {
    this.router.navigate(['services'], {
      state: {
        response: { token: this.token },
      },
    });
  }
}
