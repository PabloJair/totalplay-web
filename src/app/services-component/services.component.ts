import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ClickService } from '../services/click.service';
import { LoadService } from '../services/load.service';
import { Router } from '@angular/router';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  scr: string;
}
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
})
export class ServicesComponent implements OnInit {
  data: any;
  token = '';
  constructor(
    public loadService: LoadService,
    public clickService: ClickService,
    private deviceService: DeviceDetectorService,
    private router: Router
  ) {
    this.data = this.router?.getCurrentNavigation()?.extras.state?.['response'];

    if (!this.data) {
      this.router.navigate(['']);
    } else {
      this.token = this.data.token;
    }
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  tiles: Tile[] = [
    {
      text: 'Internet',
      cols: 1,
      rows: 1,
      color: '#7b7b7b',
      scr: 'assets/wifi.png',
    },
    {
      text: 'TV Interactiva',
      cols: 1,
      rows: 1,
      color: 'lightgreen',
      scr: 'assets/tv.png',
    },
    {
      text: 'Telefonía Digital',
      cols: 1,
      rows: 1,
      color: 'lightpink',
      scr: 'assets/phone.png',
    },
    {
      text: 'Club WIFI',
      cols: 1,
      rows: 1,
      color: '#DDBDF1',
      scr: 'assets/wifi.png',
    },
  ];
  tiles2: Tile[] = [
    {
      text: 'Soporte',
      cols: 1,
      rows: 1,
      color: '#7b7b7b',
      scr: 'assets/servers.png',
    },
    {
      text: 'Continuar llamada',
      cols: 1,
      rows: 1,
      color: 'lightgreen',
      scr: 'assets/satellite.png',
    },
  ];

  goToLink(url: string) {
    window.open(url, '_blank');
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
  }
}
