import { Component } from '@angular/core';
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
export class HomeComponent {
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

  goToLink(url: string) {
    window.open(url, '_blank');
  }
  playSound = () => new Audio('assets/totalplayAudio.mp3').play();
}
