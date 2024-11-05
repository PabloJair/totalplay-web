import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadService {
  readonly API_URL = 'https://s10plus.com:8443/wsdemos/rest/action/load';

  constructor(private http: HttpClient) {}

  postLoad() {
    const body = {
      application_name: 'Demo para TotalPlay',
      id_application: '20',
      id_action: '334',
      action: 'opened',
      activity: 'Acceso a Plataforma',
      label: 'INTERCEPCIÓN DE LLAMADAS',
      concept: 'INTERCEPCIÓN DE LLAMADAS',
      level: '0',
    };
    return this.http.post<any>(this.API_URL, body);
  }
}
